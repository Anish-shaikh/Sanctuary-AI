import { Patient, CheckIn, PatientWithHistory, RiskLevel } from '@/lib/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to map Prisma User to our Patient UI type
function mapUserToPatient(user: any): Patient {
  const latestNote = user.notes && user.notes.length > 0 ? user.notes[user.notes.length - 1].text : undefined;
  
  return {
    id: user.id,
    name: user.name,
    lastCheckInDate: user.lastCheckInDate || undefined,
    missedCheckIns: user.missedCheckIns,
    currentRisk: (user.currentRisk as RiskLevel) || 'LOW',
    trend: 'STABLE', // Could compute this if we wanted
    alertStatus: (user.alertStatus as Patient['alertStatus']) || 'NONE',
    counsellorNotes: latestNote,
    baselineDistress: user.baselineDistress || 20,
  };
}

// Helper to map Prisma CheckIn to our CheckIn UI type
function mapPrismaCheckIn(checkIn: any): CheckIn {
  return {
    id: checkIn.id,
    patientId: checkIn.patientId,
    date: checkIn.date,
    text: checkIn.text,
    mood: checkIn.mood,
    sentiment: checkIn.riskAssessment?.sentiment || 'Neutral',
    distressScore: checkIn.riskAssessment?.distressScore || 0,
    linguisticDriftScore: checkIn.riskAssessment?.linguisticDriftScore || 0,
    stressLevel: (checkIn.riskAssessment?.stressLevel?.toLowerCase() || 'low') as any,
    riskLevel: (checkIn.riskAssessment?.riskLevel?.toLowerCase() || 'low') as any,
    explanation: checkIn.riskAssessment?.explanation ? JSON.parse(checkIn.riskAssessment.explanation) : [],
    signals: checkIn.riskAssessment?.signals ? JSON.parse(checkIn.riskAssessment.signals) : [],
    confidence: checkIn.riskAssessment?.confidence || 0.8
  };
}

export async function getPatients(): Promise<Patient[]> {
  const users = await prisma.user.findMany({
    where: { role: 'VICTIM' },
    include: { notes: true }
  });
  return users.map(mapUserToPatient);
}

export async function getPatient(id: string): Promise<PatientWithHistory | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { 
      notes: true,
      checkIns: {
        include: { riskAssessment: true },
        orderBy: { date: 'asc' }
      }
    }
  });

  if (!user) return null;

  return {
    ...mapUserToPatient(user),
    history: user.checkIns.map(mapPrismaCheckIn)
  };
}

export async function addCheckIn(checkIn: Omit<CheckIn, 'id'>): Promise<CheckIn> {
  // First update the user risk level based on the check in risk
  let currentRisk = 'LOW';
  let alertStatus = 'NONE';
  if (checkIn.riskLevel === 'high') {
    currentRisk = 'HIGH';
    alertStatus = 'REVIEW_REQUIRED';
  } else if (checkIn.riskLevel === 'moderate') {
    currentRisk = 'MODERATE';
  }

  // Create CheckIn, RiskAssessment, and update Patient in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // 1. Update patient
    await tx.user.update({
      where: { id: checkIn.patientId },
      data: {
        lastCheckInDate: checkIn.date,
        missedCheckIns: 0,
        currentRisk: currentRisk as any,
        alertStatus: alertStatus !== 'NONE' ? alertStatus : undefined,
      }
    });

    // 2. Create checkin & risk assessment
    return await tx.checkIn.create({
      data: {
        patientId: checkIn.patientId,
        date: checkIn.date,
        text: checkIn.text,
        mood: checkIn.mood,
        riskAssessment: {
          create: {
            sentiment: checkIn.sentiment,
            distressScore: checkIn.distressScore,
            stressLevel: checkIn.stressLevel.toUpperCase() as any,
            linguisticDriftScore: checkIn.linguisticDriftScore,
            riskLevel: checkIn.riskLevel.toUpperCase() as any,
            explanation: JSON.stringify(checkIn.explanation),
            signals: JSON.stringify(checkIn.signals),
            confidence: checkIn.confidence
          }
        }
      },
      include: { riskAssessment: true }
    });
  });

  return mapPrismaCheckIn(result);
}

export async function updatePatientAlert(id: string, status: Patient['alertStatus']): Promise<void> {
  await prisma.user.update({
    where: { id },
    data: { alertStatus: status === 'NONE' ? null : status }
  });
}

export async function getCheckIn(id: string): Promise<CheckIn | null> {
  const checkIn = await prisma.checkIn.findUnique({
    where: { id },
    include: { riskAssessment: true }
  });
  if (!checkIn) return null;
  return mapPrismaCheckIn(checkIn);
}
