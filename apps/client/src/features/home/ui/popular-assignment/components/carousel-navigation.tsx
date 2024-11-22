import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

const CarouselNavigation = ({ onPrev, onNext }: CarouselNavigationProps) => (
  <>
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
      onClick={onPrev}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
      onClick={onNext}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </>
);

export default CarouselNavigation;
