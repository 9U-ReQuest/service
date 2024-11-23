"use client";

import { allFilters } from "@/shared/constant/category";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Flex from "@/shared/ui/wrapper/flex/flex";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import FilterButton from "./category-filter-button";

interface CategoryFilterProps {
  showSelectedFilters?: boolean;
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onFilterRemove: (filter: string) => void;
  className?: string;
  expanded?: boolean;
}

export default function CategoryFilter({
  showSelectedFilters = true,
  selectedFilters,
  onFilterToggle,
  onFilterRemove,
  className,
  expanded = true,
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialVisibleCount = expanded ? 10 : allFilters.length;

  return (
    <Flex direction="col" className={cn("space-y-6 min-w-[400px]")}>
      <Flex wrap="wrap" alignItems="center" gap="2" className="max-w-[1300px]">
        {showSelectedFilters &&
          selectedFilters.map((filter) => (
            <FilterButton
              key={filter}
              filter={filter}
              isSelected={true}
              onClick={() => onFilterRemove(filter)}
              onRemove={(event) => onFilterRemove(filter)}
              isRemovable={true}
              className="rounded-full whitespace-nowrap"
            />
          ))}
      </Flex>

      <Flex alignItems="center" justifyContent="between">
        <div
          className={cn(
            "w-full flex gap-2 flex-wrap",
            !isExpanded ? `${className || "h-10"} overflow-y-hidden` : "",
            expanded ? "" : "overflow-none!",
          )}
        >
          {allFilters.map((filter, index) => (
            <FilterButton
              key={filter}
              filter={filter}
              isSelected={selectedFilters.includes(filter)}
              onClick={() => onFilterToggle(filter)}
              className={index >= initialVisibleCount && !isExpanded ? "hidden" : ""}
            />
          ))}
        </div>
      </Flex>

      {expanded && (
        <Button
          variant="outline"
          className="max-w-20 rounded-full whitespace-nowrap gap-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "접기" : "더보기"}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      )}
    </Flex>
  );
}
