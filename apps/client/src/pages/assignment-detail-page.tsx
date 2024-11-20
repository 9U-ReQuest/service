import AssignmentInfo from "@/features/business-assignment/ui/assignment-info";
import type { PromiseParams } from "@/shared/types";
import RenderMarkdown from "@/shared/ui/mdx/render-markdown";

const ASSIGNMENT_DETAIL = {
  id: "1",
  name: "AI 기반 고객 맞춤형 쇼핑 큐레이션 서비스",
  description:
    "고객의 과거 구매 이력과 선호도를 기반으로 맞춤형 상품을 추천하는 쇼핑 큐레이션 시스템 개발.",
  readme: "~~",
  lastUpdated: "2024 / 10 / 16",
};

export default async function AssignmentDetailPage({ params }: PromiseParams<{ id: string }>) {
  const { id } = await params;
  return (
    <main className="flex flex-col w-full">
      <AssignmentInfo />
      <hr className="border-[#D9D9D9]" />
      <section className="px-[100px] py-[60px] max-w-screen-2xl flex flex-col self-center w-full gap-10">
        <div className="font-extrabold space-y-10">
          <p className="text-3xl">과제 개요 및 설명</p>
          <p className="bg-primary rounded-3xl py-7 pl-6 text-xl text-white">
            설명 : {ASSIGNMENT_DETAIL.description}
          </p>
        </div>
        <RenderMarkdown source={"```markdown```"} />
      </section>
    </main>
  );
}
