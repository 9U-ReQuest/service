import { mockListings } from "@/entities/assignment/mocks";
import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import AssignmentBanner from "@/features/assignment/assignment-banner";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

export default function AssignmentPage() {
  return (
    <div className="w-full flex flex-col">
      <AssignmentBanner />
      <div className="w-full px-24 mb-24">
        <AssignmentList
          cards={mockListings}
          extraControls={
            <Button
              className={cn(
                "bg-[#8B1D1D] hover:bg-[#7A1919] text-white w-full text-lg font-medium",
                "w-[162px] h-[44px] px-4 box-border",
              )}
            >
              <span className="mr-2">+</span>
              과제 생성하기
            </Button>
          }
          headerTitle="전체 과제"
        />
      </div>
    </div>
  );
}
