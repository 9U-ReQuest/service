"use client";

import Pagination from "@/widgets/ui/pagination-impl";
import type { ReactNode } from "react";
import { useState } from "react";
import type { AssignmentCardType, AssingmentCardList } from "../../types/assignment.type";
import AssignmentCard from "./assignment-card";

const ITEMS_PER_PAGE = 12;

interface AssignmentListProps {
  cards: AssingmentCardList;
  headerTitle?: string;
  extraControls?: ReactNode;
  isPagination?: boolean;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  cards,
  headerTitle = "전체 과제",
  extraControls,
  isPagination = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const total = cards.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const paginatedCards = cards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="w-full py-12">
      <div className="w-full flex items-center justify-between mb-16 text-xl">
        <h2 className="font-semibold">
          {headerTitle} <span className="text-primary font-bold">({total})</span>
        </h2>
        {extraControls && <div>{extraControls}</div>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedCards.map((card: AssignmentCardType) => (
          <AssignmentCard key={card.id} card={card} />
        ))}
      </div>

      {isPagination && totalPages > 1 && (
        <Pagination
          className="mt-8"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </section>
  );
};

export default AssignmentList;
