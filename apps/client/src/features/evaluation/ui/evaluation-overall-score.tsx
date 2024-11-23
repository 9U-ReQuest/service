"use client";

import { trpc } from "@/shared/api/trpc";
import Typography from "@/shared/ui/common/typography/typography";

const EvaluationOverallScore = () => {
  const { data: reviewData } = trpc.v1.submission.review.useQuery({ id: "1" });
  const overallScore = reviewData?.scenarios.filter((s) => s.id === "summary")[0].score;

  const commentByScore = (score: number) => {
    if (score < 20) {
      return "매우 아쉬운 점수에요.";
    }
    if (score < 40) {
      return "아쉬운 점수에요.";
    }
    if (score < 60) {
      return "조금 아쉬운 점수에요.";
    }
    if (score < 80) {
      return "우수한 점수에요!";
    }
    return "매우 우수한 점수에요!";
  };
  return (
    <>
      <Typography as="p" className="text-xl font-bold">
        내 과제 종합 점수는 <span className="text-primary">{overallScore || 0}점</span> 이에요
      </Typography>
      <Typography as="p" size="lg" weight="semibold" className="text-[#939393]">
        {commentByScore(overallScore || 0)}
      </Typography>
      <div className="bg-[#E4E4E4] w-full text-[#B7B7B7] py-2 px-4 text-right rounded-full relative font-bold">
        100
        <div
          className="bg-primary text-white py-2 px-4 text-right rounded-full absolute top-0 left-0"
          style={{ width: `${overallScore || 0}%` }}
        >
          {overallScore || 0}
        </div>
      </div>
    </>
  );
};

export default trpc.withTRPC(EvaluationOverallScore);
