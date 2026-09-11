"use server";

import { updatePatientAlert } from "@/services/db";
import { revalidatePath } from "next/cache";

export async function markAsReviewed(patientId: string) {
  await updatePatientAlert(patientId, 'ACKNOWLEDGED');
  revalidatePath(`/counsellor`);
  revalidatePath(`/counsellor/case/${patientId}`);
}
