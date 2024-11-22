import EvaluationItem from "@/features/evaluations/ui/evaluation-item";
import OngoingAssignment from "@/features/evaluations/ui/ongoing-assignment";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";

const EVALUATIONS = [
  {
    id: 1,
    category: "웹사이트 제작 / 쿠팡 / API",
    title: "오픈 API를 활용한 웹사이트 만들기",
    date: "2024/07/11",
    score: 92,
    status: "DONE",
  },
  {
    id: 2,
    category: "App / kakao / AI",
    title: "인공지능을 접목한 카카오톡",
    date: "2024/06/22",
    score: 88,
    status: "DONE",
  },
  {
    id: 3,
    category: "자유주제 / 현대자동차, LG / AI",
    title: "AI를 활용하여 자유주제로 APP 서비스 제작하기",
    date: "2024/06/13",
    score: 36,
    status: "DONE",
  },
  {
    id: 4,
    category: "웹사이트 / SK 홈쇼핑 / FE",
    title: "홈쇼핑 웹사이트 만들기",
    date: "2024/10/29",
    score: 84,
    status: "PENDING",
  },
];

export default function EvaluationsPage() {
  return (
    <Flex as="main" direction="col" className="w-full p-24">
      <Flex as="section" direction="col" alignItems="center">
        <Flex direction="col" gap="12">
          <section className="space-y-2">
            <Typography as="p" size="2xl" weight="extrabold">
              AI 과제 평가
            </Typography>
            <Typography as="p" size="sm" weight="medium" whitespace="pre-line">
              Re_Quest의 AI는 개발자가 작성한 코드에 대해 실시간으로 평가와 피드백을 제공합니다.
              단순히 정답 여부를 확인하는 것을 넘어, 작성된 코드의 완성도와 효율성을 다각도로
              분석하여 개발자가 더 나은 코드를 작성할 수 있도록 돕습니다.
            </Typography>
          </section>
          <section className="space-y-3">
            <Typography as="p" size="lg" weight="semibold">
              진행중인 과제
            </Typography>
            <OngoingAssignment />
          </section>
        </Flex>
      </Flex>
      <hr className="-mx-24 border-[#C6C6C6] my-20" />
      <section className="space-y-3">
        <Typography as="p" size="lg" weight="semibold">
          평가중{" "}
          <Typography as="span" size="lg" weight="bold" color="primary">
            &#40;{EVALUATIONS.length}&#41;
          </Typography>
        </Typography>
        <Flex
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {EVALUATIONS.map((evaluation) => (
            <EvaluationItem key={evaluation.id} {...evaluation} />
          ))}
        </Flex>
      </section>
    </Flex>
  );
}
