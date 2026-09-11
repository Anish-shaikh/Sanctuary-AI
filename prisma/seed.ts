const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Counsellor
  const counsellor = await prisma.user.create({
    data: {
      id: 'counsellor-1',
      name: 'Dr. Sarah',
      role: 'COUNSELLOR'
    }
  });

  // Create Patients (Victims)
  const p1 = await prisma.user.create({
    data: {
      id: 'p1',
      name: 'Case 1042',
      role: 'VICTIM',
      baselineDistress: 25,
      missedCheckIns: 0,
      currentRisk: 'LOW',
      alertStatus: 'NONE',
      assignedToId: counsellor.id,
      notes: {
        create: { text: 'Responding well to CBT techniques.' }
      }
    }
  });

  const p2 = await prisma.user.create({
    data: {
      id: 'p2',
      name: 'Case 1088',
      role: 'VICTIM',
      baselineDistress: 45,
      missedCheckIns: 1,
      currentRisk: 'HIGH',
      alertStatus: 'REVIEW_REQUIRED',
      assignedToId: counsellor.id,
      notes: {
        create: { text: 'Missed last appointment. Need to follow up regarding recent stressful events.' }
      }
    }
  });

  const p3 = await prisma.user.create({
    data: {
      id: 'p3',
      name: 'Case 1105',
      role: 'VICTIM',
      baselineDistress: 60,
      missedCheckIns: 2,
      currentRisk: 'MODERATE',
      alertStatus: 'ACKNOWLEDGED',
      assignedToId: counsellor.id,
      notes: {
        create: { text: 'Showed improvement in last session, but missed recent check-ins.' }
      }
    }
  });

  const today = new Date();
  const subDays = (date: Date, days: number) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Create CheckIns
  await prisma.checkIn.create({
    data: {
      id: 'c1',
      patientId: 'p1',
      date: formatDate(subDays(today, 2)),
      text: "Had a pretty normal day today. Walked in the park.",
      mood: "Neutral",
      riskAssessment: {
        create: {
          sentiment: "Neutral",
          distressScore: 20,
          linguisticDriftScore: 5,
          stressLevel: 'LOW',
          riskLevel: 'LOW',
          explanation: JSON.stringify(["Language indicates a stable routine.", "No acute distress markers."]),
          signals: JSON.stringify(["Routine activity", "Normal affect"]),
          confidence: 0.9
        }
      }
    }
  });

  await prisma.checkIn.create({
    data: {
      id: 'c2',
      patientId: 'p1',
      date: formatDate(today),
      text: "Feeling okay. Just tired from work.",
      mood: "Tired",
      riskAssessment: {
        create: {
          sentiment: "Slightly negative",
          distressScore: 28,
          linguisticDriftScore: 8,
          stressLevel: 'LOW',
          riskLevel: 'LOW',
          explanation: JSON.stringify(["Mentions fatigue but no severe distress.", "Consistent with baseline."]),
          signals: JSON.stringify(["Fatigue", "Work-related stress"]),
          confidence: 0.85
        }
      }
    }
  });

  await prisma.checkIn.create({
    data: {
      id: 'c3',
      patientId: 'p2',
      date: formatDate(subDays(today, 3)),
      text: "Everything is getting harder. I don't know why I try.",
      mood: "Overwhelmed",
      riskAssessment: {
        create: {
          sentiment: "Negative",
          distressScore: 75,
          linguisticDriftScore: 40,
          stressLevel: 'HIGH',
          riskLevel: 'HIGH',
          explanation: JSON.stringify(["Expressions of hopelessness and overwhelm.", "High distress markers."]),
          signals: JSON.stringify(["Hopelessness", "High stress"]),
          confidence: 0.88
        }
      }
    }
  });

  await prisma.checkIn.create({
    data: {
      id: 'c4',
      patientId: 'p2',
      date: formatDate(today),
      text: "I can't sleep. The memories keep coming back. It's too much.",
      mood: "Anxious",
      riskAssessment: {
        create: {
          sentiment: "Very Negative",
          distressScore: 88,
          linguisticDriftScore: 65,
          stressLevel: 'HIGH',
          riskLevel: 'HIGH',
          explanation: JSON.stringify(["Indicators of trauma recall and severe sleep disruption.", "Significant deviation from baseline."]),
          signals: JSON.stringify(["Sleep disruption", "Intrusive memories", "Elevated anxiety"]),
          confidence: 0.92
        }
      }
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
