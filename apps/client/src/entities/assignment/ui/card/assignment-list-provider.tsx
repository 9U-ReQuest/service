"use client";

import { trpc } from "@/shared/api/trpc";
import { ROUTES } from "@/shared/constant/url";
import Typography from "@/shared/ui/common/typography/typography";
import type { Assignment } from "@request/specs";
import Link from "next/link";
import AssignmentList from "./assignment-list";

const AssignmentListProvider = () => {
  const { data } = trpc.v1.asgmt.list.useQuery({});

  return (
    <AssignmentList
      extraControls={
        <Link href={ROUTES.ASSIGNMENT_BUSINESS} passHref legacyBehavior>
          <Typography as="a">전체 기업과제 확인하기 &gt;</Typography>
        </Link>
      }
      isPagination={false}
      assignments={(data?.data as Assignment[]) || []}
      headerTitle="전체 과제"
    />
  );
};

export default trpc.withTRPC(AssignmentListProvider);
