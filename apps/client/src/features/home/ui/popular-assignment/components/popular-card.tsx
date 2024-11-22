import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
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
      <Flex
        direction="col"
        justifyContent="between"
        className={cn("h-[400px] p-8 relative rounded-lg bg-[#1a237e]")}
      >
        <div className="space-y-2">
          <Typography as="h3" size="sm" weight="semibold" color="white">
            {assignment.name}
          </Typography>
          <Typography as="p" size="base" color="white">
            {assignment.description}
          </Typography>
        </div>
        <Link href={`/assignment/${assignment.id}`}>
          <Typography size="base" weight="semibold" color="white">
            자세히보기
          </Typography>
        </Link>
      </Flex>
    </Card>
  );
};

export default PopularCard;
