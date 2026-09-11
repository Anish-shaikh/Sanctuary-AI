import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Activity, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 space-y-12">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Activity className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          MannRakshak
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System for Victims of Atrocities.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/check-in">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white">
              <HeartPulse className="mr-2 h-5 w-5" /> Start Check-in
            </Button>
          </Link>
          <Link href="/counsellor">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-lg">
              <ShieldAlert className="mr-2 h-5 w-5" /> Counsellor Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
        <Card>
          <CardHeader>
            <CardTitle>AI/NLP Analysis</CardTitle>
            <CardDescription>Advanced linguistics processing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Analyzes text and voice inputs to detect sentiment, distress indicators, and linguistic drift over time.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personal Baselines</CardTitle>
            <CardDescription>Dynamic trend tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Establishes individual baselines to accurately identify significant deviations and elevated risk levels.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decision Support</CardTitle>
            <CardDescription>Explainable alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Provides counsellors with transparent reasons for alerts, ensuring human-in-the-loop interventions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
