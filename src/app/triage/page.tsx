import { getPatients } from '@/services/db';
import { CounsellorView } from '@/components/CounsellorView';
import { ShieldAlert } from 'lucide-react';

export default async function CounsellorDashboard() {
  const patients = await getPatients();

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Counsellor Dashboard</h1>
          <p className="text-zinc-500">Overview of assigned cases and active alerts.</p>
        </div>
      </div>

      <CounsellorView initialPatients={patients} />
    </div>
  );
}
