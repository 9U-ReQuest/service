"use client";

import monitor from "@/assets/images/create-assignment.png";
import { trpc } from "@/shared/api/trpc";
import { Badge } from "@/shared/ui/badge";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateAssignmentLayout from "./create-assignment-layout";

interface CreatingAssignmentProps {
  createProps: {
    field: string[];
    tech: string[];
    company: string[];
  };
  onNext: () => void;
}

export default function CreatingAssignment({ createProps, onNext }: CreatingAssignmentProps) {
  const [pollingEnabled, setPollingEnabled] = useState(false);

  const generateMutation = trpc.v1.asgmt.generate.useMutation({
    onSuccess: (data) => {
      setPollingEnabled(true);
    },
    onError: (error) => {
      console.error("과제 생성 중 오류 발생:", error);
      setPollingEnabled(true);
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    generateMutation.mutate({
      fields: createProps.field,
      techs: createProps.tech,
      companies: createProps.company,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const id = generateMutation.data?.id;

  const { data: user } = trpc.v1.user.me.useQuery();

  const { data: assignment } = trpc.v1.asgmt.get.useQuery(
    { id: id || (user?.lastGeneratedAssignment as string) },
    {
      enabled: pollingEnabled || !!id || !!user?.lastGeneratedAssignment,
      refetchInterval: 3000,
    },
  );

  // 과제 생성이 되면 다음 단계로 넘어가기
  useEffect(() => {
    if (assignment?.status === "READY") {
      onNext();
    }
  }, [assignment?.status, onNext]);

  const entries = Object.entries(createProps).reduce<string[]>(
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    (acc, [key, value]) => [...acc, ...value],
    [],
  );

  return (
    <CreateAssignmentLayout>
      <Flex direction="col" alignItems="center" justifyContent="center" className="p-4 bg-white">
        <Flex direction="col" alignItems="center" gap="2" className="mb-6">
          <Typography as="h1" size="lg" weight="semibold" align="center">
            현재 아래 키워드를 활용해 과제 생성하고 있어요!
          </Typography>
          <Typography as="p" size="lg" weight="semibold" align="center">
            잠시만 기다려주세요!
          </Typography>
        </Flex>

        <div className="relative mb-8">
          <Image src={monitor} alt="creating-assignment" width={609} height={300} />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="w-16 h-16 border-t-4 border-r-6 border-primary rounded-full animate-spin"></div>
          </div>
        </div>

        <Flex wrap="wrap" gap="6" alignItems="center" justifyContent="center" className="max-w-2xl">
          {entries.map((keyword) => (
            <Badge key={keyword} className="bg-[#862E2A] py-1 px-3 rounded-3xl">
              <Typography as="span" size="sm" weight="semibold" color="white">
                {keyword}
              </Typography>
            </Badge>
          ))}
        </Flex>
      </Flex>
    </CreateAssignmentLayout>
  );
}
