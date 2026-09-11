"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, PhoneCall } from "lucide-react";
import { markAsReviewed } from "@/app/actions";

export function CaseActions({ patientId, alertStatus }: { patientId: string, alertStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleReview = () => {
    startTransition(async () => {
      await markAsReviewed(patientId);
    });
  };

  return (
    <div className="flex gap-3">
      <Button variant="outline" className="gap-2">
        <PhoneCall className="h-4 w-4" /> Contact
      </Button>
      {alertStatus === 'REVIEW_REQUIRED' && (
        <Button 
          className="gap-2 bg-green-600 hover:bg-green-700" 
          onClick={handleReview}
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4" /> 
          {isPending ? "Marking..." : "Mark as Reviewed"}
        </Button>
      )}
    </div>
  );
}
