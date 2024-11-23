import { ROUTES } from "@/shared/constant/url";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import type { Assignment } from "@request/specs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type PopularCardProps = {
  assignment: Assignment;
  isSelected: boolean;
};

const PopularCard = ({ assignment, isSelected }: PopularCardProps) => {
  return (
    <Card
      className={cn(
        "transition-all duration-500 ease-in-out border-none",
        isSelected ? "flex-[0_0_60%]" : "flex-[0_0_20%]",
      )}
    >
      <Flex
        direction="col"
        justifyContent="between"
        className={cn("h-[400px] rounded-3xl px-16 py-10 relative bg-[#3F457B]")}
      >
        <div className="space-y-5">
          <Typography as="h3" size={isSelected ? "sm" : "xs"} weight="semibold" color="white">
            {assignment.prompt.companies.map((company) => company).join(" / ")}
          </Typography>
          <Typography
            as="p"
            size={isSelected ? "4xl" : "2xl"}
            weight={isSelected ? "bold" : "semibold"}
            color="white"
            whitespace="pre-line"
          >
            {assignment.prompt.techs.map((tech) => tech).join("\n")}
          </Typography>
        </div>
        <Link
          href={`${ROUTES.ASSIGNMENT_BUSINESS}/${assignment.id}`}
          className="flex gap-1 white items-center"
        >
          <Typography size="base" weight="semibold" color="white">
            자세히보기
          </Typography>
          <ArrowRight size={20} color="white" />
        </Link>
      </Flex>
    </Card>
  );
};

export default PopularCard;
