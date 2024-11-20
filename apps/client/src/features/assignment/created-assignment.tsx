import { mockListings } from "@/entities/assignment/mocks";
import AssignmentCardList from "@/entities/assignment/ui/card/assignment-card-list";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

export default function CreatedAssignment() {
  return (
    <section className="w-full py-12">
      <CreatedAssigmentHeader total={100} />
      <AssignmentCardList cards={mockListings} />
    </section>
  );
}

interface CreatedAssigmentHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
}
function CreatedAssigmentHeader({ total }: CreatedAssigmentHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between mb-16 text-xl">
      <h2 className="font-semibold">
        전체 과제 <span className="text-[#8A1B22] font-bold">({total})</span>
      </h2>
      <div>
        <Button
          className={cn(
            "bg-[#8B1D1D] hover:bg-[#7A1919] text-white w-full text-lg font-medium",
            "w-[162px] h-[44px] px-4 box-border",
          )}
        >
          <span className="mr-2">+</span>
          과제 생성하기
        </Button>
      </div>
    </div>
  );
}
