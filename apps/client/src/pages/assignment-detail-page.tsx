"use client";

import lotte from "@/assets/images/lotte.png";
import { trpc } from "@/shared/api/trpc";
import { combinePrompt } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import { TRPCClientError } from "@trpc/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Markdown from "./markdown";

const AssignmentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";
  const { data } = trpc.v1.asgmt.get.useQuery({ id });
  const { mutate } = trpc.v1.submission.init.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push("/evaluation");
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        const errorCode = error.data?.code;
        if (errorCode === "TOO_MANY_REQUESTS") {
          alert("이미 진행 중인 제출물이 있습니다. 제출 완료 후 다시 시도하세요.");
          return router.push("/evaluation");
        }
      } else {
        console.error("Unknown Error:", error);
      }
    },
  });

  const getDate = () => {
    return data?.lastUpdated || new Date();
  };

  const handleCreateSubmission = () => {
    mutate({ assignmentId: id });
  };
  return (
    <Flex as="main" direction="col" className="w-full">
      <Flex
        as="section"
        justifyContent="between"
        className="self-center w-full px-[100px] py-[60px] max-w-screen-2xl"
      >
        <Flex gap="10" className="w-full">
          <Image src={lotte} alt="기업 이미지" width={360} height={240} />
          <Flex direction="col" justifyContent="between" className="w-full">
            <Flex direction="col" className="leading-10" gap="3">
              <Typography as="p" size="lg">
                {combinePrompt(data?.prompt.fields || ["기술"])} /{" "}
                {combinePrompt(data?.prompt.companies || ["기업"])}
              </Typography>
              <Typography as="p" size="3xl" weight="bold">
                {data?.name || "제목"}
              </Typography>
              <Typography as="p" size="sm" className="text-[#313131]">
                {new Date(getDate()).toLocaleDateString()}
              </Typography>
            </Flex>
            <Button
              variant="link"
              className="self-end bg-[#F0F0F0] px-14 py-5 rounded-lg hover:no-underline"
              onClick={handleCreateSubmission}
            >
              <Typography as="p" size="lg" weight="bold" color="black">
                과제 도전하기
              </Typography>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <hr className="border-[#D9D9D9]" />
      <Flex
        as="section"
        direction="col"
        gap="10"
        className="px-[100px] py-[60px] max-w-screen-2xl self-center w-full"
      >
        <div className="space-y-10">
          <Typography as="p" size="3xl" weight="extrabold">
            과제 설명
          </Typography>
          <Typography
            as="p"
            size="xl"
            weight="extrabold"
            color="white"
            className="bg-primary rounded-3xl py-7 pl-6"
          >
            설명 : {data?.description || "설명입니다."}
          </Typography>
        </div>
        <Markdown source={data?.readme} />
      </Flex>
    </Flex>
  );
};

export default trpc.withTRPC(AssignmentDetailPage);
