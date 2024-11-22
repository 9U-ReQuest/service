// TaskFilterMain.tsx

"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

interface TaskFilterMainProps {
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onFilterRemove: (filter: string) => void;
  className?: string;
  expanded?: boolean;
}

const allFilters = [
  "서버/백엔드",
  "프론트엔드",
  "웹 풀스택",
  "안드로이드 앱",
  "아이폰 앱",
  "머신러닝",
  "크로스 플랫폼",
  "VR/AR/3D",
  "ERP",
  "그래픽스",
  "데이터베이스",
  "클라우드",
  "DevOps",
  "임베디드",
  "게임 개발",
  "게임 플레이어",
  "게임서버",
  "시스템/네트워크",
  "인공지능 (AI)",
  "데이터 엔지니어",
  "DBA",
  "모바일 게임",
  "게임PM",
  "웹 퍼블리싱",
  "응용 프로그램",
  "로보틱스 미들웨어",
  "QA",
  "사물인터넷(IoT)",
  "데브옵스",
  "인터넷 보안",
  "임베디드 소프트웨어",
  "시스템 소프트웨어",
  "블록체인",
];

export default function CategoryFilter({
  selectedFilters,
  onFilterToggle,
  onFilterRemove,
  className,
  expanded = true,
}: TaskFilterMainProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialVisibleCount = expanded ? 10 : allFilters.length;

  const handleRemoveFilter = (event: React.MouseEvent, filter: string) => {
    event.stopPropagation();
    onFilterRemove(filter);
  };

  return (
    <div className={cn("flex flex-col space-y-6")}>
      <div className="flex flex-wrap max-w-[1300px] w-full items-center gap-2">
        {selectedFilters.map((filter) => (
          <Button
            key={filter}
            variant="secondary"
            className="rounded-full whitespace-nowrap"
            onClick={(e) => handleRemoveFilter(e, filter)}
          >
            {filter}
            <X className="ml-2 h-4 w-4 cursor-pointer" />
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-full flex gap-2 flex-wrap",
            !isExpanded ? `${className || "h-10"} overflow-y-hidden` : "",
            expanded ? "" : "overflow-none!",
          )}
        >
          {allFilters.map((filter, index) => (
            <Button
              key={filter}
              variant={selectedFilters.includes(filter) ? "secondary" : "outline"}
              className={`rounded-lg whitespace-nowrap ${
                index >= initialVisibleCount && !isExpanded ? "hidden" : ""
              }`}
              onClick={() => onFilterToggle(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
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
    </div>
  );
}
