"use client";
import {
  CreateAssignmentSchema,
  type InProgress,
} from "@/entities/assignment/create/schema/create-assignment-schema";
import { companies } from "@/shared/constant/company";
import { techStack } from "@/shared/constant/tech";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import CategoryFilter from "@/widgets/ui/category-filter/category-filter";
import SelectItem from "@/widgets/ui/select-item";
import { X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import CreateAssignmentLayout from "./create-assignment-layout";

interface ConfirmUserInfoProps {
  onNext: (filedProps?: InProgress) => void;
}

export default function InputUserInfo({ onNext }: ConfirmUserInfoProps) {
  // 유저 정보 가져와서 fields, tech, company로 보여줌
  const [fields, setFields] = useState<string[]>([]);
  const handleFilterFields = (filter: string) => {
    setFields((prev) => (prev.length < 3 ? [...prev, filter] : prev));
  };
  const handleRemoveFields = (filter: string) => {
    setFields((prev) => prev.filter((f) => f !== filter));
  };

  const [tech, setTech] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  console.log(fields, tech, company);

  // 삭제 버튼 누르면 없애야 함.
  const handleRemoveField = (field: string, type: "fields" | "tech" | "company") => {
    console.log(field, type);
    if (type === "fields") {
      setFields((prev) => prev.filter((f) => f !== field));
    } else if (type === "tech") {
      setTech((prev) => prev.filter((t) => t !== field));
    } else {
      setCompany((prev) => prev.filter((c) => c !== field));
    }
  };

  const handleNext = () => {
    try {
      CreateAssignmentSchema.parse({ field: fields, tech, company });
      setError(null);
      onNext({ field: fields, tech, company });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const handleRemoveFilter = (
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setFilter((prev) => prev.filter((item) => item !== value));
  };

  return (
    <CreateAssignmentLayout className="h-auto py-10">
      <Flex direction="col" className="w-full max-w-2xl mx-auto p-4">
        <Typography as="h3" size="lg" weight="semibold" className="mb-4">
          생성하고 싶은 과제의 정보를 입력해주세요
        </Typography>

        <Card className="p-8">
          <Flex direction="col" gap="8">
            <Flex direction="col" gap="4">
              <Typography as="h2" size="lg" weight="medium">
                1. 희망 직무를 선택해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                <CategoryFilter
                  showSelectedFilters={false}
                  selectedFilters={fields}
                  onFilterToggle={handleFilterFields}
                  onFilterRemove={handleRemoveFields}
                  expanded={false}
                  className="h-full"
                />
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="lg" weight="medium">
                2. 관심 기술을 선택해주세요 (최대 3개)
              </Typography>
              <Flex direction="col" gap="2">
                <SelectItem
                  items={techStack}
                  value={tech}
                  setValue={(value) => (value.length <= 3 ? setTech(value) : setTech(tech))}
                />
                <Flex direction="row" gap="2" className="h-9">
                  {tech.map((filter) => (
                    <Button
                      key={filter}
                      variant="secondary"
                      className="rounded-full whitespace-nowrap"
                      onClick={() => handleRemoveFilter(setTech, filter)}
                    >
                      {filter}
                      <X className="my-1 ml-2 h-4 w-4 cursor-pointer" />
                    </Button>
                  ))}
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="lg" weight="medium">
                3. 관심 기업을 선택해주세요 (최대 3개)
              </Typography>
              <Flex direction="col" wrap="wrap" gap="2">
                <SelectItem
                  items={companies}
                  value={company}
                  setValue={(value) =>
                    value.length <= 3 ? setCompany(value) : setCompany(company)
                  }
                />
                <Flex direction="row" gap="2" className="h-9">
                  {company.map((filter) => (
                    <Button
                      key={filter}
                      variant="secondary"
                      className="rounded-full whitespace-nowrap"
                      onClick={() => handleRemoveFilter(setCompany, filter)}
                    >
                      {filter}
                      <X className="my-1 ml-2 h-4 w-4 cursor-pointer" />
                    </Button>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Typography size="sm" weight="normal" className="text-red-500 mt-2">
          {error}
        </Typography>

        <Flex direction="col" gap="4" className="mt-8">
          <Button className="w-full py-6" onClick={handleNext}>
            <Typography size="base" weight="semibold" color="white">
              AI과제 생성하기
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </CreateAssignmentLayout>
  );
}
