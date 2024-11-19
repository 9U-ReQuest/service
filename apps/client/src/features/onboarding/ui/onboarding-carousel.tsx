"use client";

import { cn } from "@/shared/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { Button } from "@request/ui-kit";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ONBOARDINGS } from "../constants";

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrent(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="flex">
        <Button
          variant="link"
          className="p-0 aspect-square rounded-full bg-[#EAEAEA] self-end"
          onClick={scrollPrev}
        >
          <Image src="/icons/arrow-left.svg" alt="이전 온보딩" width={24} height={24} />
        </Button>
        <Carousel className="w-[565px]">
          <CarouselContent ref={emblaRef}>
            <div className="flex">
              {ONBOARDINGS.map((ONBOARDING, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={index}>
                  <div className="font-semibold text-3xl text-center space-y-14 whitespace-pre-line">
                    {ONBOARDING.description}
                    <Image
                      src={ONBOARDING.src}
                      alt={`온보딩 이미지 ${index}`}
                      width={ONBOARDING.width}
                      height={ONBOARDING.height}
                      className="mx-auto"
                    />
                  </div>
                </CarouselItem>
              ))}
            </div>
          </CarouselContent>
        </Carousel>
        <Button
          variant="link"
          className="p-0 aspect-square rounded-full bg-[#EAEAEA] self-end"
          onClick={scrollNext}
        >
          <Image src="/icons/arrow-right.svg" alt="다음 온보딩" width={24} height={24} />
        </Button>
      </div>
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              index === current ? "bg-[#787878]" : "bg-[#D9D9D9]",
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
          />
        ))}
      </div>
    </>
  );
}
