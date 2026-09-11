import { getPatient } from '@/services/db';
import { TrendChart } from '@/components/TrendChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CalendarX2, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function PersonalDashboard() {
  // Using Mock Patient 1
  const patient = await getPatient('p1');
  
  if (!patient) return <div>Patient not found</div>;

  const getTrendIcon = (trend: string) => {
    if (trend === 'WORSENING') return <ArrowUpRight className="text-red-500" />;
    if (trend === 'IMPROVING') return <ArrowDownRight className="text-green-500" />;
    return <Minus className="text-blue-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wellbeing Dashboard</h1>
          <p className="text-zinc-500">Track your personal trends over time.</p>
        </div>
        <Link href="/check-in">
          <Button className="bg-blue-600 hover:bg-blue-700">New Check-in</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Trend</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {patient.trend} {getTrendIcon(patient.trend)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500">Based on recent check-ins compared to baseline.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Missed Check-ins</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {patient.missedCheckIns} <CalendarX2 className="text-orange-500 h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500">Consecutive days without checking in.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Baseline</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {patient.baselineDistress} <Activity className="text-blue-500 h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500">Your normal stable distress level.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distress & Linguistic Drift History</CardTitle>
          <CardDescription>Visualizing your check-in data</CardDescription>
        </CardHeader>
        <CardContent>
          {patient.history.length > 0 ? (
            <TrendChart data={patient.history} baseline={patient.baselineDistress} />
          ) : (
            <div className="flex items-center justify-center h-[350px] text-zinc-500">
              No history available. Please complete a check-in.
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
        <strong>Note:</strong> This dashboard is for your awareness. Your counsellor also monitors these trends to provide timely support.
      </div>
    </div>
  );
}
