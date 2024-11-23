import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import * as React from "react";
import CircularProgress from "./circular-progress";

interface ScoreData {
  value: number;
  label: string;
}

const SCORES: ScoreData[] = [
  { value: 83, label: "응답의 정확성" },
  { value: 48, label: "컨벤션" },
  { value: 49, label: "코드 구조의 효율성" },
  { value: 71, label: "로직 구현의 논리성" },
];

interface DetailedScoresProps {
  name: string;
  score: number | undefined;
}

export default function DetailedScores({
  detailScores,
}: Record<"detailScores", DetailedScoresProps[]>) {
  return (
    <div className="space-y-3 max-w-2xl self-center w-screen px-24">
      <h2 className="text-xl font-bold">상세 점수</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {detailScores.length === 0 || undefined ? (
          <div>준비 중입니다.</div>
        ) : (
          detailScores.map(({ score, name }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Card key={index} className="border p-10">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <CircularProgress value={score || 0} max={100} size={120} strokeWidth={12} />
                <p
                  className={cn(
                    "mt-4 text-center text-lg font-bold text-white bg-primary w-full py-2 rounded-full",
                    (score || 0) < 60 ? "bg-inactive text-black" : "bg-secondary",
                  )}
                >
                  {name}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
