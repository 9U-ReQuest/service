"use client";

import { OnboardingSchema } from "@/entities/onboarding/schema/onboard-funnel";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import Flex from "@/shared/ui/wrapper/flex/flex";
import { useState } from "react";
import { z } from "zod";
import OnboardingLayout from "./onboarding-layout";

export default function InputName({
  onNext,
}: {
  onNext: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    try {
      OnboardingSchema.parse({ name });
      setError(null);
      onNext(name);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <OnboardingLayout>
      <Flex direction="col" gap="2">
        <Typography as="h2" size="xl" weight="bold">
          ReQuest에서는 여러분의 이름이 필요해요!
        </Typography>
        <Typography size="base" weight="normal" className="mb-2">
          서비스 시작 전, 이름을 입력해주세요.
        </Typography>
        <Label htmlFor="github-email">이름</Label>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNext();
          }}
          className={error ? "border-red-500" : ""}
        />
        {error && (
          <Typography size="sm" weight="normal" className="text-red-500 mt-1">
            {error}
          </Typography>
        )}
      </Flex>
      <Button type="button" className="w-full" onClick={handleNext}>
        다음으로
      </Button>
    </OnboardingLayout>
  );
}
