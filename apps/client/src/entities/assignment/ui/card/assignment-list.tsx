"use client";

import usePagination from "@/shared/hooks/use-pagination";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Pagination from "@/widgets/ui/pagination-impl";
import type { Assignment } from "@request/specs";
import type { ReactNode } from "react";
import AssignmentCard from "./assignment-card";

const ITEMS_PER_PAGE = 12;

interface AssignmentListProps {
  assignments: Assignment[];
  headerTitle?: string;
  extraControls?: ReactNode;
  isPagination?: boolean;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  headerTitle = "전체 과제",
  extraControls,
  isPagination = true,
}) => {
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedCards,
    goToPage,
    goToPrev,
    goToNext,
  } = usePagination<Assignment>({
    items: assignments,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const total = assignments.length;

  return (
    <section className="w-full py-12">
      <Flex alignItems="center" justifyContent="between" className="w-full mb-16">
        <Typography as="h2" size="xl" weight="semibold">
          {headerTitle}{" "}
          <Typography as="span" size="xl" weight="bold" color="primary">
            ({total})
          </Typography>
        </Typography>
        {extraControls && <div>{extraControls}</div>}
      </Flex>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedCards.map((card: Assignment) => (
          <AssignmentCard key={card.id} assignment={card} />
        ))}
      </div>

      {isPagination && totalPages > 1 && (
        <Pagination
          className="mt-8"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={goToPrev}
          onNext={goToNext}
        />
      )}
    </section>
  );
};

export default AssignmentList;
