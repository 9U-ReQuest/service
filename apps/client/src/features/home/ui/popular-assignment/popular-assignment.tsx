"use client";

import useEmbla from "@/shared/hooks/use-embla";
import { mockAssignments } from "@/shared/mocks/constant/assignment.mock";
import Typography from "@/shared/ui/common/typography/typography";
import CarouselIndicators from "./components/carousel-indicator";
import CarouselNavigation from "./components/carousel-navigation";
import PopularCard from "./components/popular-card";

const PopularAssignment = () => {
  const sliceMockAssignments = mockAssignments.slice(0, 3);
  const { emblaRef, selectedIndex, scrollPrev, scrollNext, scrollTo } = useEmbla();

  return (
    <div className="w-full py-12">
      <Typography as="h2" size="xl" weight="semibold">
        인기과제
      </Typography>

      <div className="relative mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {sliceMockAssignments.map((assignment, index) => (
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
        total={sliceMockAssignments.length}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
      />
    </div>
  );
};

export default PopularAssignment;
