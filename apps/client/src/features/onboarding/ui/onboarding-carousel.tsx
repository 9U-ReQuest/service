"use client";

import arrowLeftSvg from "@/assets/icons/arrow-left.svg";
import arrowRightSvg from "@/assets/icons/arrow-right.svg";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ONBOARDINGS } from "../constants";

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })] as any);

  const scrollPrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  };

  const onSelect = (emblaApi: EmblaCarouselType) => {
    setCurrent(emblaApi.selectedScrollSnap());
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi]);

  return (
    <>
      <div className="flex">
        <Button
          variant="link"
          className="p-0 aspect-square rounded-full bg-[#EAEAEA] self-end"
          onClick={scrollPrev}
        >
          <Image src={arrowLeftSvg} alt="이전 온보딩" width={40} height={40} />
        </Button>
        <Carousel className="w-[565px] overflow-hidden">
          <CarouselContent ref={emblaRef} id="im emcon">
            <div className="flex">
              {ONBOARDINGS.map((ONBOARDING, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={`onboarding-item-${index}`} id="im emit">
                  <div className="font-semibold text-3xl text-center space-y-14 whitespace-pre-line">
                    <p>{ONBOARDING.description}</p>
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
          <Image src={arrowRightSvg} alt="다음 온보딩" width={40} height={40} />
        </Button>
      </div>
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              index === current ? "bg-selected" : "bg-not-selected",
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={`dot-${index}`}
          />
        ))}
      </div>
    </>
  );
}
