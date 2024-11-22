// src/entities/assignment/ui/card/AssignmentCard.tsx
"use client";

import { companyInfoMap } from "@/shared/constant/company";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Assignment } from "@request/specs";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const companyName = assignment.prompt.companies.join("/");
  const companyInfo = companyInfoMap[companyName];

  return (
    <Card className="group justify-center relative overflow-hidden shadow-none border-none">
      <CardHeader className="p-0">
        <div className="w-full relative overflow-hidden aspect-[3/2]">
          <Image
            src={companyInfo.logo}
            alt={`${companyInfo.category} 로고`}
            fill
            className="object-cover rounded-3xl border"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
            onClick={toggleBookmark}
          >
            <Star className={isBookmarked ? "fill-primary" : "fill-none"} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-4">
        <div className="space-y-2 font-medium">
          <div className="text-sm">
            {companyInfo.category} / {companyName.charAt(0).toUpperCase() + companyName.slice(1)}
          </div>
          <h3 className="text-lg line-clamp-1">{assignment.name}</h3>
          <div className="text-base">{new Date(assignment.lastUpdated).toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
