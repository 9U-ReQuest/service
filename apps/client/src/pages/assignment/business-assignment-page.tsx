"use client";

import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import TaskFilter from "@/entities/assignment/ui/filter/assignment-filter";
import { mockAssignments } from "@/shared/mocks/constant/assignment.mock";
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
      <TaskFilter
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
        onFilterRemove={handleFilterRemove}
      />
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
