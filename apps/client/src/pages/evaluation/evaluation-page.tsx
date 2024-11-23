"use client";

import EvaluationItem, { type EvaluationItemProps } from "@/features/evaluation/ui/evaluation-item";
import OngoingAssignment from "@/features/evaluation/ui/ongoing-assignment";
import { trpc } from "@/shared/api/trpc";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";

const EvaluationPage = () => {
  const { data: listData } = trpc.v1.submission.list.useQuery(undefined, { refetchInterval: 3000 });
  const { data: assignmentList } = trpc.v1.asgmt.list.useQuery({});
  const ongoingAssignments = listData?.filter(
    (submission) => submission.status === "PREPARING" || submission.status === "STARTED",
  )[0];
  const restAssignments = listData?.filter(
    (submission) => submission.status !== "PREPARING" && submission.status !== "STARTED",
  );
  const { data: assignmentData } = trpc.v1.asgmt.get.useQuery(
    { id: ongoingAssignments?.assignmentId as string },
    { enabled: typeof ongoingAssignments !== "undefined" },
  );
  const ongoingData = {
    status: ongoingAssignments?.status,
    repoUrl: ongoingAssignments?.repoUrl,
    prompt: assignmentData?.prompt,
    name: assignmentData?.name,
    lastUpdated: assignmentData?.lastUpdated,
  };
  const filteredRestAssignments = assignmentList?.data.filter((assignment, idx) => {
    if (restAssignments?.some((rest) => rest.assignmentId === assignment.id)) {
      return {
        ...assignmentList.data[idx],
        status: assignment.status,
      };
    }
  });

  return (
    <Flex as="main" direction="col" className="w-full px-24 py-14">
      <Flex as="section" direction="col" alignItems="center">
        <Flex direction="col" gap="12">
          <section className="space-y-2">
            <Typography as="p" size="2xl" weight="extrabold">
              AI 과제 평가
            </Typography>
            <Typography as="p" size="sm" weight="medium" whitespace="pre-line">
              {`Re_Quest의 AI는 개발자가 작성한 코드에 대해 실시간으로 평가와 피드백을 제공합니다.
              단순히 정답 여부를 확인하는 것을 넘어, 작성된 코드의 완성도와 효율성을 다각도로
              분석하여 개발자가 더 나은 코드를 작성할 수 있도록 돕습니다.`}
            </Typography>
          </section>
          <section className="space-y-3">
            <Typography as="p" size="lg" weight="semibold">
              진행중인 과제
            </Typography>
            <OngoingAssignment {...ongoingData} />
          </section>
        </Flex>
      </Flex>
      <hr className="-mx-24 border-[#C6C6C6] my-20" />
      <section className="space-y-3">
        <Typography as="p" size="lg" weight="semibold">
          평가중{" "}
          <Typography as="span" size="lg" weight="bold" color="primary">
            &#40;{restAssignments?.length || 0}&#41;
          </Typography>
        </Typography>
        <Flex
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {filteredRestAssignments?.length === 0 ? (
            <Typography as="p" align="center">
              시도한 과제가 없습니다.
            </Typography>
          ) : (
            filteredRestAssignments?.map((evaluation) => (
              <EvaluationItem key={evaluation.id} {...(evaluation as EvaluationItemProps)} />
            ))
          )}
        </Flex>
      </section>
    </Flex>
  );
};

export default trpc.withTRPC(EvaluationPage);
