"use client";

import DetailedScores from "@/features/onboarding/ui/detailed-scores";
import Markdown from "@/pages/markdown";
import { trpc } from "@/shared/api/trpc";
import Typography from "@/shared/ui/common/typography/typography";
import { useParams } from "next/navigation";

const EvaluationComment = () => {
  const parmas = useParams();
  const id = (parmas?.id as string) || "1";
  const { data: reviewData } = trpc.v1.submission.review.useQuery({ id });
  const { data: reviewEntriesData } = trpc.v1.submission.reviewEntries.useQuery({ id });
  const { data: userData } = trpc.v1.user.me.useQuery();
  const detailScores = reviewEntriesData
    ?.filter((entry) => entry.scenario === "summary")
    .map((entry) => ({
      name: entry.name,
      score: entry.score,
    }));

  return (
    <>
      <DetailedScores detailScores={detailScores || []} />
      <section className="self-center w-full max-w-2xl px-24 mt-24 mb-10">
        <div className="mb-7">
          <Typography as="p" className="text-xl font-bold">
            AI가 분석한 {userData?.name || "ReQuest"}님의 과제에 대한 코멘트에요!
          </Typography>
          <Typography as="p" className="text-[#939393]">
            분석 코멘트는 아래와 같은 기준에 따라 작성되었어요.
          </Typography>
        </div>
        {/* <div className="space-y-10">
          <div className="p-12 border border-[#DEDEDE] rounded-3xl">
            <Markdown source={`# ${reviewData?.summary}` || ""} />
          </div>
          <div className="p-12 bg-primary rounded-3xl text-white">
            <Markdown source={reviewData?.summary || ""} />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default trpc.withTRPC(EvaluationComment);
