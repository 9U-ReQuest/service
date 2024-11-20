"use client";

import arrowRightSvg from "@/assets/icons/arrow-right-white.svg";
import pendingSvg from "@/assets/icons/pending.svg";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EvaluationItemProps {
  id: number;
  category: string;
  title: string;
  date: string;
  score: number;
  status: string;
}

export default function EvaluationItem({
  id,
  category,
  title,
  date,
  score,
  status,
}: EvaluationItemProps) {
  const isPending = status === "PENDING";
  const router = useRouter();

  const handleRouteToResult = () => {
    router.push(`/evaluations/${id}`);
  };
  return (
    <div
      className={`py-5 px-9 border-[2.5px] rounded-[20px] leading-6 flex flex-col justify-between w-[300px] h-[216px] bg-white ${isPending ? "pending" : "border-[#8A1B22]"} `}
    >
      <div className="space-y-0.5">
        <p className="text-xs">{category}</p>
        <p className="text-sm font-bold line-clamp-2">{title}</p>
        <p className="text-[10px]">{date}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm">과제 점수: {score}</p>
        <Button
          variant="link"
          className={`w-full bg-[#8A1B22] py-6 rounded-lg hover:no-underline text-white font-bold text-sm flex items-center ${isPending && "bg-[#F0F0F0] text-black"}`}
          onClick={handleRouteToResult}
        >
          <div className="flex-1" />
          <p className="flex-1">{isPending ? "AI 채점중" : "AI 리뷰 결과 확인하기"}</p>
          <Image
            src={isPending ? pendingSvg : arrowRightSvg}
            alt={isPending ? "AI 채점중" : "AI 리뷰 결과 확인하기"}
            className={`flex-1 ${isPending && "w-4 h-4"}`}
          />
        </Button>
      </div>
    </div>
  );
}
