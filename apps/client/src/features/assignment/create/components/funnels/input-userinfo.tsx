"use client";
import {
  CreateAssignmentSchema,
  type InProgress,
} from "@/entities/assignment/create/schema/create-assignment-schema";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import CategoryFilter from "@/widgets/ui/category-filter/category-filter";
import SelectItem from "@/widgets/ui/select-item";
import { useState } from "react";
import { z } from "zod";
import CreateAssignmentLayout from "./create-assignment-layout";

interface ConfirmUserInfoProps {
  onNext: (filedProps?: InProgress) => void;
}

export default function InputUserInfo({ onNext }: ConfirmUserInfoProps) {
  // 유저 정보 가져와서 fields, tech, company로 보여줌
  const [fields, setFields] = useState<string[]>(["안드로이드", "프론트엔드", "QA"]);
  const [tech, setTech] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  // 삭제 버튼 누르면 없애야 함.
  const handleRemoveField = (field: string, type: "fields" | "tech" | "company") => {
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
                  selectedFilters={fields}
                  onFilterToggle={(filter) => fields.length < 3 && setFields([...fields, filter])}
                  onFilterRemove={(filter) => handleRemoveField(filter, "fields")}
                />
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="lg" weight="medium">
                2. 관심 기술을 선택해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                <SelectItem
                  items={[
                    { value: "Rest API", label: "Rest API" },
                    { value: "Adobe Photoshop", label: "Adobe Photoshop" },
                    { value: "Axios", label: "Axios" },
                  ]}
                  value={tech}
                  setValue={(value) => (value.length <= 3 ? setTech(value) : setTech(tech))}
                />
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="lg" weight="medium">
                3. 관심 기업을 선택해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                <SelectItem
                  items={[
                    { value: "Kakao", label: "Kakao" },
                    { value: "Naver", label: "Naver" },
                    { value: "Google", label: "Google" },
                  ]}
                  value={company}
                  setValue={(value) =>
                    value.length <= 3 ? setCompany(value) : setCompany(company)
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Card>

        {error && (
          <Typography size="sm" weight="normal" className="text-red-500 mt-2">
            {error}
          </Typography>
        )}

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
