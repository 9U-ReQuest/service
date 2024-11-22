"use client";

import { trpc } from "@/shared/api/trpc";
import Typography from "@/shared/ui/common/typography/typography";

const EvaluationResultInfo = () => {
  const { data: assginmentData } = trpc.v1.asgmt.get.useQuery({ id: "1" });
  const category = assginmentData?.prompt.fields.join(" / ");

  return (
    <>
      <div>
        <Typography as="p" className="text-xl">
          {category || "과제 카테고리"}
        </Typography>
        <Typography as="p" className="text-2xl font-bold">
          {assginmentData?.name || "과제 이름"}
        </Typography>
      </div>
      <div className="space-y-3">
        <Typography as="p" className="font-extrabold text-xl">
          과제 설명
        </Typography>
        <Typography as="p" className="bg-primary rounded-3xl py-7 pl-6 text-white font-extrabold">
          설명 : {assginmentData?.description || "과제 설명란"}
        </Typography>
      </div>
    </>
  );
};

export default trpc.withTRPC(EvaluationResultInfo);
