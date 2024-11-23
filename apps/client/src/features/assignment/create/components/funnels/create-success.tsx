"use client";

import SuccessImage from "@/assets/images/create-success.png";
import { trpc } from "@/shared/api/trpc";
import { ROUTES } from "@/shared/constant/url";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import Link from "next/link";
import CreateAssignmentLayout from "./create-assignment-layout";

export default function CreateSuccess() {
  const { data: user } = trpc.v1.user.me.useQuery();
  const { data: assignment } = trpc.v1.asgmt.get.useQuery(
    { id: user?.lastGeneratedAssignment as string },
    {
      enabled: !!user?.lastGeneratedAssignment,
      refetchInterval: 3000,
    },
  );

  if (!assignment) {
    return null;
  }
  console.log(assignment);

  const company = assignment.prompt.companies.join(" / ");
  const tech = assignment.prompt.techs.join(" / ");
  const field = assignment.prompt.fields.join(" / ");

  return (
    <CreateAssignmentLayout>
      <Flex direction="col" alignItems="center" justifyContent="center" className="p-4 bg-white">
        <div className="mb-8">
          <Image
            src={SuccessImage}
            alt="Github Illustration"
            width={233}
            height={137}
            className="mx-auto"
          />
        </div>

        <Flex direction="col" alignItems="center" gap="2" className="mb-8">
          <Typography as="h1" size="xl" weight="semibold" align="center" whitespace="pre-line">
            {"과제 생성이 완료 되었어요!\n지금 바로 Github를 통해 생성된 과제를 확인해보세요!"}
          </Typography>
        </Flex>

        <Card className="w-full max-w-2xl p-6 mb-8">
          <Flex direction="col" gap="4">
            <Typography as="h2" size="lg" weight="bold" align="center">
              제목 : 게임 내 이벤트 추천 시스템
            </Typography>

            <div>
              <Typography size="base" color="muted" align="center">
                {`관심기업의 [${company}]과 관심 기술의 [${tech}]을 접목하여`}
              </Typography>

              <Typography size="base" color="muted" align="center">
                <Typography as="span" color="primary" weight="bold">
                  {`[${field}] 직무`}
                </Typography>{" "}
                에 대한 과제를 생성하였습니다.
              </Typography>
            </div>

            <Flex wrap="wrap" gap="2" className="mt-4" justifyContent="center">
              {[...company.split(" / "), ...tech.split(" / ")].map((keyword) => (
                <Badge key={keyword} variant="outline" className="border-[#862E2A] text-[#862E2A]">
                  {keyword}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Card>

        <Link href={ROUTES.EVALUATOIN} className="w-full">
          <Button className="w-full text-white py-6 rounded-3xl">
            <Typography as="span" size="sm" weight="extrabold" color="white">
              과제 확인하기
            </Typography>
          </Button>
        </Link>
      </Flex>
    </CreateAssignmentLayout>
  );
}
