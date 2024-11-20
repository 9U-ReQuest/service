import EvaluationItem from "@/features/evaluations/ui/evaluation-item";
import OngoingAssignment from "@/features/evaluations/ui/ongoing-assignment";

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
    <main className="flex flex-col w-full p-24">
      <section className="space-y-12">
        <section className="space-y-2">
          <p className="font-extrabold text-2xl">AI 과제 평가</p>
          <p className="font-medium text-sm leading-6">
            Re_Quest의 AI는 개발자가 작성한 코드에 대해 실시간으로 평가와 피드백을 제공합니다.
            <br />
            단순히 정답 여부를 확인하는 것을 넘어, 작성된 코드의 완성도와 효율성을
            <br />
            다각도로 분석하여 개발자가 더 나은 코드를 작성할 수 있도록 돕습니다.
          </p>
        </section>
        <section className="space-y-3">
          <p className="font-semibold text-lg">진행중인 과제</p>
          <OngoingAssignment />
        </section>
      </section>
      <hr className="-mx-24 border-[#C6C6C6] my-20" />
      <section className="space-y-3">
        <p className="text-lg font-semibold">
          평가중 <span className="font-bold text-[#8A1B22]">(6)</span>
        </p>
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {EVALUATIONS.map((evaluation) => (
            <EvaluationItem key={evaluation.id} {...evaluation} />
          ))}
        </div>
      </section>
    </main>
  );
}
