import { cn } from "@/shared/lib/utils";

type CarouselIndicatorsProps = {
  total: number;
  selectedIndex: number;
  onSelect?: (index: number) => void;
};

const CarouselIndicators = ({ total, selectedIndex, onSelect }: CarouselIndicatorsProps) => (
  <div className="flex justify-center gap-2 mt-4">
    {Array.from({ length: total }).map((_, index) => (
      <button
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        type="button"
        className={cn(
          "w-2 h-2 rounded-full transition-all",
          index === selectedIndex ? "bg-[#787878]" : "bg-gray-300",
        )}
        onClick={() => onSelect?.(index)}
      />
    ))}
  </div>
);

export default CarouselIndicators;
