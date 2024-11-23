"use client";

import baemin from "@/assets/images/baemin.png";
import { combinePrompt } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import type { Assignment, SubmissionStatus } from "@request/specs";
import Image from "next/image";

interface OngoingAssignmentProps
  extends Partial<Pick<Assignment, "prompt" | "lastUpdated" | "name">> {
  repoUrl?: string;
  status?: SubmissionStatus;
}

export default function OngoingAssignment(props: OngoingAssignmentProps) {
  const isStarted = props?.status === "STARTED";
  const allPrompts = [
    ...(props?.prompt?.fields || []),
    ...(props?.prompt?.techs || []),
    ...(props?.prompt?.companies || []),
  ];

  const handleRouteToAssignment = () => {
    window.location.href = props.repoUrl || window.location.href;
  };

  const getDate = () => {
    return props?.lastUpdated || new Date();
  };

  return (
    <div className="relative">
      <div className="absolute flex justify-between p-2 xl:p-8 lg:p-4 sm:p-2 w-full h-full">
        <div className="flex flex-col justify-between">
          <div className="space-y-1">
            <Typography as="p" size="xs">
              {combinePrompt(allPrompts || ["과제 정보"])}
            </Typography>
            <Typography weight="bold" size="xl">
              {props?.name || "과제 이름"}
            </Typography>
          </div>
          <Typography size="sm">{new Date(getDate()).toLocaleDateString()}</Typography>
        </div>
        <Button
          variant="link"
          className="self-end font-bold bg-white text-black px-14 py-5 rounded-lg hover:no-underline"
          onClick={handleRouteToAssignment}
          disabled={!isStarted}
        >
          {isStarted ? (
            "과제 확인하기"
          ) : (
            <div className="w-4 h-4 rounded-full border border-primary border-r-0 animate-spin" />
          )}
        </Button>
      </div>
      <Image src={baemin} alt="과제 이미지" width={1298} height={216} />
    </div>
  );
}
