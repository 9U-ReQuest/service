"use client";

import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import CategoryFilter from "@/widgets/ui/category-filter";
import { useState } from "react";
import OnboardingLayout from "./onboarding-layout";

const allFilters = [
  "서버개발자",
  "프론트엔드",
  "앱 개발자",
  "안드로이드 앱",
  "아이폰 앱",
  "AI/머신러닝",
  "클라우드/인프라",
  "데브옵스",
  "시스템/네트워크엔지니어",
  "게임 클라이언트",
  "게임서버",
  "시스템소프트웨어개발",
  "웹 풀스택",
  "크로스 플랫폼",
  "VR/AR/3D",
  "ERP",
  "그래픽스",
  "데이터베이스",
  "임베디드",
  "게임 개발",
  "게임 플레이어",
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
  "인터넷 보안",
  "임베디드 소프트웨어",
  "블록체인",
];

export default function InputField({
  onNext,
}: {
  onNext: (fields: string[]) => void;
}) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const handleFilterRemove = (filter: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleNext = () => {
    if (selectedFilters.length > 0) {
      onNext(selectedFilters);
    }
  };

  return (
    <OnboardingLayout>
      <Flex direction="col" gap="4">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <Typography as="h2" size="xl" weight="bold">
            희망 직무를 선택해주세요
          </Typography>
          <Typography size="base" weight="normal" className="text-muted-foreground">
            4년 이상의 경력 기술 분야
          </Typography>
          <CategoryFilter
            selectedFilters={selectedFilters}
            onFilterToggle={handleFilterToggle}
            onFilterRemove={handleFilterRemove}
            expanded={false}
            className="h-full"
          />
        </div>

        <Button
          onClick={handleNext}
          className="w-full mt-4"
          disabled={selectedFilters.length === 0}
        >
          다음으로
        </Button>
      </Flex>
    </OnboardingLayout>
  );
}
