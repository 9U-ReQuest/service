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

export default function InputGithub({
  onNext,
}: {
  onNext: (github: string) => void;
}) {
  const [github, setGithub] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    try {
      OnboardingSchema.parse({ github });
      setError(null);
      onNext(github);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <OnboardingLayout>
      <Flex direction="col" gap="12">
        <div className="space-y-2">
          <Typography as="h2" size="lg" weight="bold">
            GitHub에서 사용하는 이메일 주소를 입력해주세요.
          </Typography>
          <Typography size="sm" weight="normal" className="mb-2 h-10" whitespace="pre-line">
            {"AI 코드리뷰 및 과제 생성을 위해 \n여러분의 GitHub 닉네임이 필요해요!"}
          </Typography>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github-email">Github 닉네임</Label>
          <Input
            id="github-email"
            type="text"
            placeholder="github 닉네임을 입력해주세요."
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className={error ? "border-red-500" : ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNext();
            }}
          />
          <Typography size="sm" weight="normal" className="text-red-500 mt-1 h-5">
            {error}
          </Typography>
        </div>
        <Button type="button" className="w-full" onClick={handleNext}>
          다음으로
        </Button>
      </Flex>
    </OnboardingLayout>
  );
}
