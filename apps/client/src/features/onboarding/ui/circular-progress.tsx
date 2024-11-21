import { cn } from "@/shared/lib/utils";
import * as React from "react";

interface CircularProgressProps {
  value: number;
  max: number;
  size: number;
  strokeWidth: number;
}

export default function CircularProgress({ value, max, size, strokeWidth }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  const badValue = value < 60;

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="stroke-muted"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="stroke-[#ECECEC]"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={0}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle
        className={cn("stroke-primary", badValue && "stroke-[#C7C7C7]")}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="fill-foreground text-3xl font-black"
      >
        {value}
      </text>
    </svg>
  );
}
