"use client";

import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import { mockAssignments } from "@/shared/mocks/constant/assignment.mock";
import CategoryFilter from "@/widgets/ui/category-filter";
import { useState } from "react";

export default function BusinessAssignmentPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const handleFilterRemove = (filter: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className="w-full flex flex-col">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">기업과제</h1>
          <p className="text-muted-foreground">
            Re_Quest는 개발자들이 기업별 과제 전형을 탐색하고
            <br className="hidden sm:inline" />
            실전 과제를 수행하며, 자신만의 해결 능력을 강화할 수 있도록 돕습니다.
          </p>
        </div>
        <CategoryFilter
          selectedFilters={selectedFilters}
          onFilterToggle={handleFilterToggle}
          onFilterRemove={handleFilterRemove}
        />
      </div>
      <div className="w-full px-24 mb-24">
        <AssignmentList
          assignments={mockAssignments}
          headerTitle="기업 과제"
          extraControls={undefined}
        />
      </div>
    </div>
  );
}
