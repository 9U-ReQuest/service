"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Assignment = {
  id: number;
  company: string;
  position: string[];
  bgColor: string;
  bgPattern: string;
};

const assignments: Assignment[] = [
  {
    id: 1,
    company: "삼성전자",
    position: ["스마트홈", "IoT 기기", "제어앱 개발"],
    bgColor: "bg-[#1a237e]",
    bgPattern: "url('/placeholder.svg?height=400&width=820')",
  },
  {
    id: 2,
    company: "SK 텔레콤",
    position: ["5G 네트워크", "품질 분석 및", "최적화 시스템 개발"],
    bgColor: "bg-[#b71c1c]",
    bgPattern: "url('/placeholder.svg?height=400&width=400')",
  },
  {
    id: 3,
    company: "넷플릭스",
    position: ["실시간 사용", "참여 기반", "인터랙티브"],
    bgColor: "bg-[#424242]",
    bgPattern: "url('/placeholder.svg?height=400&width=400')",
  },
];

export default function PopularAssignment() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full py-12">
      <h2 className="text-xl font-semibold mb-8">인기과제</h2>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {assignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className={cn(
                  "flex-[0_0_auto] min-w-0 transition-all duration-500 ease-in-out",
                  selectedIndex === index ? "w-[820px]" : "w-[400px]",
                )}
              >
                <Card>
                  <div
                    className={cn(
                      "h-[400px] p-8 relative flex flex-col justify-between duration-700 rounded-lg",
                      assignment.bgColor,
                    )}
                    style={{
                      backgroundImage: assignment.bgPattern,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white">{assignment.company}</h3>
                      <div className="space-y-1">
                        {assignment.position.map((line, i) => (
                          <p key={i} className="text-2xl font-semibold text-white">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Link href={"/assignment/${id}"} className="text-base text-white font-semibold">
                      자세히보기
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="flex justify-center gap-2 mt-4">
          {assignments.map((_, index) => (
            <button
              type="button"
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === selectedIndex ? "bg-[#787878]" : "bg-gray-300",
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
