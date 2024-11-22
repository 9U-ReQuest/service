"use client";

import usePagination from "@/shared/hooks/use-pagination";
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
      <div className="w-full flex items-center justify-between mb-16 text-xl">
        <h2 className="font-semibold">
          {headerTitle} <span className="text-primary font-bold">({total})</span>
        </h2>
        {extraControls && <div>{extraControls}</div>}
      </div>

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
