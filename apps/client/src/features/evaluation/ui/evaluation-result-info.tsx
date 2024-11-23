"use client";

import { trpc } from "@/shared/api/trpc";
import Typography from "@/shared/ui/common/typography/typography";

const EvaluationResultInfo = () => {
  const { data: assginmentData } = trpc.v1.asgmt.get.useQuery({ id: "1" });
  const category = assginmentData?.prompt.fields.join(" / ");

  return (
    <>
      <div>
        <Typography as="p" size="xs">
          {category || "과제 카테고리"}
        </Typography>
        <Typography as="p" className="text-2xl font-bold">
          {assginmentData?.name || "과제 이름"}
        </Typography>
      </div>
      <div className="space-y-3">
        <Typography as="p" size="xl" className="font-extrabold">
          과제 설명
        </Typography>
        <Typography as="p">{assginmentData?.description || "과제 설명란"}</Typography>
      </div>
    </>
  );
};

export default trpc.withTRPC(EvaluationResultInfo);
