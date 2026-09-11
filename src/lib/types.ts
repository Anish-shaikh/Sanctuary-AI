export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface CheckIn {
  id: string;
  patientId: string;
  date: string;
  text: string;
  mood: string;
  sentiment: string;
  distressScore: number; // 0-100
  linguisticDriftScore: number; // 0-100
  stressLevel: 'low' | 'moderate' | 'high';
  riskLevel: 'low' | 'moderate' | 'high';
  explanation: string[];
  signals: string[];
  confidence: number;
}

export interface Patient {
  id: string;
  name: string; // Anonymized alias like "Case 1042"
  lastCheckInDate: string | null;
  missedCheckIns: number;
  currentRisk: RiskLevel;
  trend: 'STABLE' | 'IMPROVING' | 'WORSENING';
  alertStatus: 'REVIEW_REQUIRED' | 'ACKNOWLEDGED' | 'RESOLVED' | 'NONE';
  counsellorNotes: string;
  baselineDistress: number;
}

export interface PatientWithHistory extends Patient {
  history: CheckIn[];
}
