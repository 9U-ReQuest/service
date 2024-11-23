"use client";

import type { InputTechAndCompany as InputTechAndCompanyType } from "@/entities/onboarding/schema/onboard-funnel";
import { OnboardingSchema } from "@/entities/onboarding/schema/onboard-funnel";
import { trpc } from "@/shared/api/trpc";
import { companies } from "@/shared/constant/company";
import { techStack } from "@/shared/constant/tech";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import { Label } from "@/shared/ui/label";
import Flex from "@/shared/ui/wrapper/flex/flex";
import SelectItem from "@/widgets/ui/select-item";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import OnboardingLayout from "./onboarding-layout";

export default function InputTechAndCompany({
  context,
  onNext,
}: {
  context: InputTechAndCompanyType;
  onNext: (tech: string[], company: string[]) => void;
}) {
  const mutation = trpc.v1.auth.register.useMutation();

  const [tech, setTech] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  const [techError, setTechError] = useState<string | null>(null);
  const [companyError, setCompanyError] = useState<string | null>(null);

  const handleRemoveFilter = (
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setFilter((prev) => prev.filter((item) => item !== value));
  };

  const handleNext = () => {
    try {
      OnboardingSchema.parse({ tech });
      setTechError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setTechError(err.errors[0].message);
      }
    }

    try {
      OnboardingSchema.parse({ company });
      setCompanyError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setCompanyError(err.errors[0].message);
      }
    }

    mutation.mutate(
      {
        name: context.name,
        email: context.github,
        prompt: {
          fields: context.field,
          techs: tech,
          companies: company,
        },
      },
      {
        onSuccess: () => {
          onNext(tech, company);
        },
      },
    );
  };

  useEffect(() => {
    if (tech.length > 0) {
      setTechError(null);
    }
  }, [tech]);

  useEffect(() => {
    if (company.length > 0) {
      setCompanyError(null);
    }
  }, [company]);

  return (
    <OnboardingLayout>
      <Flex direction="col" gap="6" className="mb-3">
        <Typography as="h2" size="lg" weight="bold" className="mb-1">
          관심 기술 및 기업을 선택해주세요.
        </Typography>
        <Flex direction="col" gap="2">
          <Label htmlFor="tech">관심 기술을 선택해주세요. (최대 3개)</Label>
          <SelectItem
            placeholder="검색어를 입력하여 관심 기술을 선택해주세요."
            items={techStack}
            value={tech}
            setValue={setTech}
          />
          {techError ? (
            <Typography size="sm" weight="normal" className="text-red-500 h-9">
              {techError}
            </Typography>
          ) : (
            <Flex direction="row" gap="2" className="h-9">
              {tech.map((filter) => (
                <Button
                  key={filter}
                  variant="secondary"
                  className="my-1 rounded-full whitespace-nowrap"
                  onClick={() => handleRemoveFilter(setTech, filter)}
                >
                  {filter}
                  <X className="ml-2 h-4 w-4 cursor-pointer" />
                </Button>
              ))}
            </Flex>
          )}
        </Flex>

        <Flex direction="col" gap="2">
          <Label htmlFor="company">관심 기업을 선택해주세요. (최대 3개)</Label>
          <SelectItem
            placeholder="검색어를 입력하여 관심 기업을 선택해주세요."
            items={companies}
            value={company}
            setValue={setCompany}
          />
          {companyError ? (
            <Typography size="sm" weight="normal" className="text-red-500 h-9">
              {companyError}
            </Typography>
          ) : (
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
          )}
        </Flex>
      </Flex>
      <Button type="button" className="w-full" onClick={handleNext}>
        다음으로
      </Button>
    </OnboardingLayout>
  );
}
