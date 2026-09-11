import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCheckIn } from '@/services/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, BrainCircuit, Activity, HeartPulse } from 'lucide-react';

export default async function ResultPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const params = await searchParams;
  if (!params.id) {
    redirect('/check-in');
  }

  let checkIn;
  
  if (params.id === 'mock') {
    // Fallback for Vercel demo when DB is read-only
    checkIn = {
      id: "mock",
      patientId: "p1",
      date: new Date().toISOString(),
      text: "Mock check-in",
      mood: "Neutral",
      sentiment: "Negative",
      distressScore: 85,
      stressLevel: "high" as const,
      linguisticDriftScore: 70,
      riskLevel: "high" as const,
      explanation: ["High distress detected. The user expresses significant anxiety and feelings of unsafety, likely linked to the recent encounter mentioned."],
      signals: ["Threat Detected", "Anxiety", "Fear"],
      confidence: 0.9
    };
  } else {
    checkIn = await getCheckIn(params.id);
  }

  if (!checkIn) {
    redirect('/check-in');
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">AI Analysis Result</h1>
      </div>

      <Card>
        <CardHeader className="bg-zinc-50 dark:bg-zinc-900 border-b">
          <CardTitle>Check-in Summary</CardTitle>
          <CardDescription>Processed by MannRakshak AI</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-zinc-950 border rounded-lg shadow-sm flex flex-col items-center text-center">
              <span className="text-sm text-zinc-500 font-medium mb-1">Sentiment</span>
              <span className="font-semibold">{checkIn.sentiment}</span>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-950 border rounded-lg shadow-sm flex flex-col items-center text-center">
              <span className="text-sm text-zinc-500 font-medium mb-1">Distress Score</span>
              <span className={`font-bold text-xl ${checkIn.distressScore > 75 ? 'text-red-500' : checkIn.distressScore > 40 ? 'text-orange-500' : 'text-green-500'}`}>
                {checkIn.distressScore}/100
              </span>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-950 border rounded-lg shadow-sm flex flex-col items-center text-center">
              <span className="text-sm text-zinc-500 font-medium mb-1">Stress Level</span>
              <span className="font-semibold capitalize">{checkIn.stressLevel}</span>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-950 border rounded-lg shadow-sm flex flex-col items-center text-center">
              <span className="text-sm text-zinc-500 font-medium mb-1">Linguistic Drift</span>
              <span className="font-semibold">{checkIn.linguisticDriftScore}/100</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-zinc-400" /> Explainable Analysis
            </h3>
            <div className="text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border space-y-2">
              {checkIn.explanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-zinc-400" /> Detected Signals
            </h3>
            <div className="flex flex-wrap gap-2">
              {checkIn.signals.map((signal, i) => (
                <Badge key={i} variant={checkIn.distressScore > 50 ? "destructive" : "secondary"}>
                  {signal}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm">
              <span>Risk Assessment</span>
              <span className="font-medium text-blue-600">Confidence: {(checkIn.confidence * 100).toFixed(0)}%</span>
            </div>
            <Progress value={checkIn.distressScore} className="h-2" />
          </div>

        </CardContent>
        <CardFooter className="flex justify-between border-t bg-zinc-50 dark:bg-zinc-900 pt-6">
          <Link href="/">
            <Button variant="outline">Back Home</Button>
          </Link>
          <Link href="/dashboard/personal">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <HeartPulse className="mr-2 h-4 w-4" /> View My Trends
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
