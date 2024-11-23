"use client";
import type { InProgress } from "@/entities/assignment/create/schema/create-assignment-schema";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import FilterButton from "@/widgets/ui/category-filter/category-filter-button";
import { useState } from "react";
import CreateAssignmentLayout from "./create-assignment-layout";

interface ConfirmUserInfoProps {
  onNext: (branch: "InputUserInfo" | "InProgress", filedProps?: InProgress) => void;
}

export default function SelectionForm({ onNext }: ConfirmUserInfoProps) {
  const [fields, setFields] = useState<string[]>(["안드로이드", "프론트엔드", "QA"]);
  const [tech, setTech] = useState<string[]>(["Rest API", "Adobe Photoshop", "Axios"]);
  const [company, setCompany] = useState<string[]>(["Kakao", "현대자동차", "넷마블"]);

  const handleRemoveField = (field: string, type: "fields" | "tech" | "company") => {
    if (type === "fields") {
      if (fields.length === 1) {
        return alert("하나 이상의 직무는 선택되어야 합니다.");
      }
      setFields(fields.filter((f) => f !== field));
    } else if (type === "tech") {
      if (tech.length === 1) {
        return alert("하나 이상의 기술은 선택되어야 합니다.");
      }
      setTech(tech.filter((t) => t !== field));
    } else {
      if (company.length === 1) {
        return alert("하나 이상의 기업은 선택되어야 합니다.");
      }
      setCompany(company.filter((c) => c !== field));
    }
  };

  return (
    <CreateAssignmentLayout>
      <Flex direction="col" className="w-full max-w-2xl p-4">
        <Typography as="h3" size="lg" weight="semibold" className="mb-4">
          과제 생성 전, 생성을 위한 기본 정보가 필요해요!
        </Typography>

        <Card className="p-8">
          <Flex direction="col" gap="8">
            <Flex direction="col" gap="4">
              <Typography as="h2" size="base" weight="medium">
                1. 희망 직무를 확인해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                {fields.map((field) => (
                  <FilterButton
                    key={field}
                    filter={field}
                    isSelected={true}
                    onClick={() => handleRemoveField(field, "fields")}
                    onRemove={() => handleRemoveField(field, "fields")}
                    isRemovable={true}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="base" weight="medium">
                2. 관심 기술을 확인해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                {tech.map((t) => (
                  <FilterButton
                    key={t}
                    filter={t}
                    isSelected={true}
                    onClick={() => handleRemoveField(t, "tech")}
                    onRemove={() => handleRemoveField(t, "tech")}
                    isRemovable={true}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex direction="col" gap="4">
              <Typography as="h2" size="base" weight="medium">
                3. 관심 기업을 확인해주세요
              </Typography>
              <Flex wrap="wrap" gap="2">
                {company.map((c) => (
                  <FilterButton
                    key={c}
                    filter={c}
                    isSelected={true}
                    onClick={() => handleRemoveField(c, "company")}
                    onRemove={() => handleRemoveField(c, "company")}
                    isRemovable={true}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Flex gap="4" className="mt-8">
          <Button
            className="w-full py-6"
            onClick={() =>
              onNext("InProgress", {
                field: fields,
                tech,
                company,
              })
            }
          >
            <Typography size="base" weight="semibold" color="white">
              AI 과제 생성하기
            </Typography>
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 border-2 border-primary"
            onClick={() => onNext("InputUserInfo")}
          >
            <Typography size="base" weight="semibold" color="black">
              정보 새로 입력하기
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </CreateAssignmentLayout>
  );
}
