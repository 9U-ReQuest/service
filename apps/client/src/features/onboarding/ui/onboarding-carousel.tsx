"use client";

import arrowLeftSvg from "@/assets/icons/arrow-left.svg";
import arrowRightSvg from "@/assets/icons/arrow-right.svg";
import CarouselIndicators from "@/features/home/ui/popular-assignment/components/carousel-indicator";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ONBOARDINGS } from "../constants";

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })] as any);

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
      <Flex gap="14">
        <Button
          variant="link"
          className="p-0 aspect-square rounded-full bg-[#f7f6f6] self-end"
          onClick={scrollPrev}
        >
          <Image src={arrowLeftSvg} alt="이전 온보딩" width={28} height={28} />
        </Button>
        <Carousel className="max-w-[430px] overflow-hidden">
          <CarouselContent ref={emblaRef}>
            <Flex>
              {ONBOARDINGS.map((ONBOARDING, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={`onboarding-item-${index}`} className="self-end rounded-3xl">
                  <Flex direction="col" alignItems="center" gap="10">
                    <Typography
                      as="p"
                      size="base"
                      weight="bold"
                      align="center"
                      whitespace="pre-line"
                      className="leading-5"
                    >
                      {ONBOARDING.description}
                    </Typography>
                    {/* <Image
                      src={ONBOARDING.src}
                      alt={`온보딩 이미지 ${index}`}
                      width={300}
                      height={300}
                      className="m-0"
                    /> */}
                    <DotLottieReact src={ONBOARDING.src} loop autoplay />
                  </Flex>
                </CarouselItem>
              ))}
            </Flex>
          </CarouselContent>
        </Carousel>
        <Button
          variant="link"
          className="p-0 aspect-square rounded-full bg-[#f7f6f6] self-end"
          onClick={scrollNext}
        >
          <Image src={arrowRightSvg} alt="다음 온보딩" width={28} height={28} />
        </Button>
      </Flex>
      <CarouselIndicators total={4} selectedIndex={current} />
    </>
  );
}
