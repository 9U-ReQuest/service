import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import type { Assignment } from "@request/specs";
import Link from "next/link";

type PopularCardProps = {
  assignment: Assignment;
  isSelected: boolean;
};

const PopularCard = ({ assignment, isSelected }: PopularCardProps) => {
  return (
    <Card
      className={cn(
        "transition-all duration-500 ease-in-out",
        isSelected ? "flex-[0_0_60%]" : "flex-[0_0_20%]",
      )}
    >
      <div
        className={cn(
          "h-[400px] p-8 relative flex flex-col justify-between rounded-lg bg-[#1a237e]",
        )}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">{assignment.name}</h3>
          <p className="text-base font-semibold text-white">{assignment.description}</p>
        </div>
        <Link href={`/assignment/${assignment.id}`} className="text-base text-white font-semibold">
          자세히보기
        </Link>
      </div>
    </Card>
  );
};

export default PopularCard;
