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

const ASSIGNMENT_ID_KEY = "assignmentId";

export default function CreatingAssignment({ createProps, onNext }: CreatingAssignmentProps) {
  const [pollingEnabled, setPollingEnabled] = useState(false);

  const getStoredId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ASSIGNMENT_ID_KEY);
    }
    return null;
  };

  const [assignmentId, setAssignmentId] = useState<string | null>(getStoredId());

  const generateMutation = trpc.v1.asgmt.generate.useMutation({
    onSuccess: (data) => {
      const id = data.id;
      setAssignmentId(id);
      localStorage.setItem(ASSIGNMENT_ID_KEY, id);
      setPollingEnabled(true);
    },
    onError: (error) => {
      console.error("과제 생성 중 오류 발생:", error);
      setPollingEnabled(true);
    },
  });

  const { data: user } = trpc.v1.user.me.useQuery(undefined, {
    enabled: !!assignmentId,
  });

  const { data: assignment } = trpc.v1.asgmt.get.useQuery(
    { id: assignmentId || (user?.lastGeneratedAssignment as string) },
    {
      enabled: pollingEnabled && !!(assignmentId || user?.lastGeneratedAssignment),
      refetchInterval: 3000,
    },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!assignmentId) {
      generateMutation.mutate({
        fields: createProps.field,
        techs: createProps.tech,
        companies: createProps.company,
      });
    } else {
      setPollingEnabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (assignment?.status === "READY") {
      onNext();
      localStorage.removeItem(ASSIGNMENT_ID_KEY);
    }
  }, [assignment?.status, onNext]);

  const entries = Object.entries(createProps).flatMap(([_, value]) => value);

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
