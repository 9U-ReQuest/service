"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
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

export default function AssignmentList({
  cards,
  headerTitle = "전체 과제",
  extraControls,
  isPagination = true,
}: AssignmentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const total = cards.length;
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

  const paginatedCards = cards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="w-full py-12">
      <div className="w-full flex items-center justify-between mb-16 text-xl">
        <h2 className="font-semibold">
          {headerTitle} <span className="text-[#8A1B22] font-bold">({total})</span>
        </h2>
        {extraControls && <div>{extraControls}</div>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedCards.map((card: AssignmentCardType) => (
          <AssignmentCard key={card.id} card={card} />
        ))}
      </div>
      {isPagination && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent className="gap-4">
              <PaginationItem>
                <PaginationPrevious
                  isActive={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  isActive={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
