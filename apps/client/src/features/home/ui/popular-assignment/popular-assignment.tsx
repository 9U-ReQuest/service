"use client";

import { trpc } from "@/shared/api/trpc";
import useEmbla from "@/shared/hooks/use-embla";
import Typography from "@/shared/ui/common/typography/typography";
import type { Assignment } from "@request/specs";
import CarouselIndicators from "./components/carousel-indicator";
import CarouselNavigation from "./components/carousel-navigation";
import PopularCard from "./components/popular-card";

const PopularAssignment = () => {
  const { emblaRef, selectedIndex, scrollPrev, scrollNext, scrollTo } = useEmbla();
  const { data } = trpc.v1.asgmt.list.useQuery({});
  const assignments = (data?.data as Assignment[]) || [];

  return (
    <div className="w-full py-12">
      <Typography as="h2" size="xl" weight="semibold">
        인기과제
      </Typography>
      <div className="relative mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {assignments.slice(0, 5).map((assignment, index) => (
              <PopularCard
                key={assignment.id}
                assignment={assignment}
                isSelected={selectedIndex === index}
              />
            ))}
          </div>
        </div>
        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
      </div>

      <CarouselIndicators
        total={assignments.length}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
      />
    </div>
  );
};

export default trpc.withTRPC(PopularAssignment);
