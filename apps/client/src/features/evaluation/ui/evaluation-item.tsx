"use client";

import arrowRightSvg from "@/assets/icons/arrow-right-white.svg";
import pendingSvg from "@/assets/icons/pending.svg";
import { combinePrompt, getDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import type { Assignment, SubmissionStatus } from "@request/specs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface EvaluationItemProps extends Omit<Assignment, "status"> {
  status: SubmissionStatus;
}

export default function EvaluationItem(props: EvaluationItemProps) {
  const isReviewing = props?.status === "REVIEWING";
  const router = useRouter();

  const allPrompts = [
    ...(props?.prompt?.fields || []),
    ...(props?.prompt?.techs || []),
    ...(props?.prompt?.companies || []),
  ];

  const handleRouteToResult = () => {
    router.push(`/evaluation/${props?.id}`);
  };

  return (
    <div
      className={`py-5 px-9 border-[2.5px] rounded-[20px] leading-6 flex flex-col justify-between h-[216px] bg-white ${isReviewing ? "pending" : "border-[#8A1B22]"} `}
    >
      <div className="space-y-0.5">
        <Typography size="xs">{combinePrompt(allPrompts || ["과제 정보"])}</Typography>
        <Typography size="sm" weight="bold" lineClamp="2">
          {props?.name || "과제 이름"}
        </Typography>
        <Typography size="xs">{getDate(props.lastUpdated)}</Typography>
      </div>
      <div className="space-y-2">
        {/* <Typography size="sm">과제 점수: 50</Typography> */}
        <Button
          variant="link"
          className={`w-[calc(100%)] self-center bg-[#8A1B22] py-6 rounded-lg hover:no-underline text-white font-bold text-sm flex items-center ${isReviewing && "bg-[#C3CCD5] text-black"}`}
          onClick={handleRouteToResult}
        >
          <div className="flex-1" />
          <Typography weight="bold" size="xs" color={isReviewing ? "black" : "white"}>
            {isReviewing ? "AI 채점중" : "AI 리뷰 결과 확인하기"}
          </Typography>
          <Image
            src={isReviewing ? pendingSvg : arrowRightSvg}
            alt={isReviewing ? "AI 채점중" : "AI 리뷰 결과 확인하기"}
            className={`flex-1 ${isReviewing && "w-4 h-4"}`}
          />
        </Button>
      </div>
    </div>
  );
}
