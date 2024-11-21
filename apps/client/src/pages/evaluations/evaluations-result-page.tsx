import DetailedScores from "@/features/onboarding/ui/detailed-scores";
import RenderMarkdown from "@/shared/ui/mdx/render-markdown";

export default function EvaluationsResultPage() {
  return (
    <main className="py-10 flex flex-col">
      <h1 className="font-bold text-4xl text-center mb-10">AI 리뷰 결과</h1>
      <section className="self-center w-full max-w-2xl px-24 space-y-7">
        <div>
          <p className="text-xl">쇼핑 / 롯데백화점</p>
          <p className="text-2xl font-bold">AI 기반 고객 맞춤형 쇼핑 큐레이션 서비스</p>
        </div>
        <div className="space-y-3">
          <p className="font-extrabold text-xl">과제 설명</p>
          <p className="bg-primary rounded-3xl py-7 pl-6 text-white font-extrabold">
            설명 : 고객의 과거 구매 이력과 선호도를 기반으로 맞춤형 상품을 추천하는 쇼핑 큐레이션
            시스템 개발.
          </p>
        </div>
      </section>
      <hr className="my-20 border-[#D9D9D9] w-screen" />
      <section className="self-center w-full max-w-2xl px-24 space-y-3">
        <p className="text-xl font-bold">
          내 과제 종합 점수는 <span className="text-primary">75점</span> 이에요
        </p>
        <div className="bg-[#E4E4E4] w-full text-[#B7B7B7] py-2 px-4 text-right rounded-full relative font-bold">
          100
          <div className="bg-primary text-white py-2 px-4 text-right rounded-full absolute top-0 left-0 w-[75%]">
            75
          </div>
        </div>
      </section>
      <hr className="my-20 border-[#D9D9D9] w-screen" />
      <DetailedScores />
      <section className="self-center w-full max-w-2xl px-24 mt-24 mb-10">
        <div className="mb-7">
          <p className="text-xl font-bold">AI가 분석한 홍길동님의 과제에 대한 코멘트에요!</p>
          <p className="text-[#939393]">분석 코멘트는 아래와 같은 기준에 따라 작성되었어요.</p>
        </div>
        <div className="space-y-10">
          <div className="p-12 border border-[#DEDEDE] rounded-3xl">
            <RenderMarkdown source="# hello" />
          </div>
          <div className="p-12 border border-[#DEDEDE] rounded-3xl">
            <RenderMarkdown source="# hello" />
          </div>
          <div className="p-12 bg-primary rounded-3xl text-white">
            <RenderMarkdown source="# hello" />
          </div>
        </div>
      </section>
    </main>
  );
}
