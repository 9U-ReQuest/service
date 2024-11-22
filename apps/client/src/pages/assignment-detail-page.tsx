import AssignmentInfo from "@/features/business-assignment/ui/assignment-info";
import type { PromiseParams } from "@/shared/types";
import Typography from "@/shared/ui/common/typography/typography";
import RenderMarkdown from "@/shared/ui/mdx/render-markdown";
import Flex from "@/shared/ui/wrapper/flex/flex";

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
    <Flex as="main" direction="col" className="w-full">
      <AssignmentInfo />
      <hr className="border-[#D9D9D9]" />
      <Flex
        as="section"
        direction="col"
        gap="10"
        className="px-[100px] py-[60px] max-w-screen-2xl self-center w-full"
      >
        <div className="space-y-10">
          <Typography as="p" size="3xl" weight="extrabold">
            과제 개요 및 설명
          </Typography>
          <Typography
            as="p"
            size="xl"
            weight="extrabold"
            color="white"
            className="bg-primary rounded-3xl py-7 pl-6"
          >
            설명 : {ASSIGNMENT_DETAIL.description}
          </Typography>
        </div>
        <RenderMarkdown source={"```markdown```"} />
      </Flex>
    </Flex>
  );
}
