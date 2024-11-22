"use client";

import { InputNameSchema } from "@/entities/onboarding/schema/onboard-funnel";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import { Label } from "@/shared/ui/label";
import Flex from "@/shared/ui/wrapper/flex/flex";
import SelectItem from "@/widgets/ui/select-item";
import { X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import OnboardingLayout from "./onboarding-layout";

export default function InputTechAndCompany({
  onNext,
}: {
  onNext: (tech: string[], company: string[]) => void;
}) {
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
      InputNameSchema.parse({ tech });
      setTechError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setTechError(err.errors[0].message);
      }
    }

    try {
      InputNameSchema.parse({ company });
      setCompanyError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setCompanyError(err.errors[0].message);
      }
    }

    onNext(tech, company);
  };

  return (
    <OnboardingLayout>
      <Flex direction="col" gap="3">
        <Typography as="h2" size="xl" weight="bold">
          관심 기술 및 기업을 선택해주세요.
        </Typography>

        <Flex direction="col" gap="2" className="mb-8">
          <Label htmlFor="tech">관심 기술을 선택해주세요. (최대 3개)</Label>
          <Flex direction="row" gap="2">
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
          <SelectItem
            items={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
              { value: "svelte", label: "Svelte" },
            ]}
            value={tech}
            setValue={setTech}
          />
          {techError && (
            <Typography size="sm" weight="normal" className="text-red-500 mt-1">
              {techError}
            </Typography>
          )}
        </Flex>

        <Flex direction="col" gap="2">
          <Label htmlFor="company">관심 기업을 선택해주세요. (최대 3개)</Label>
          <Flex direction="row" gap="2" wrap="wrap">
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
          <SelectItem
            items={[
              { value: "google", label: "Google" },
              { value: "apple", label: "Apple" },
              { value: "amazon", label: "Amazon" },
              { value: "meta", label: "Meta" },
            ]}
            value={company}
            setValue={setCompany}
          />
          {companyError && (
            <Typography size="sm" weight="normal" className="text-red-500 mt-1">
              {companyError}
            </Typography>
          )}
        </Flex>
      </Flex>
      <Button type="button" className="w-full" onClick={handleNext}>
        다음으로
      </Button>
    </OnboardingLayout>
  );
}
