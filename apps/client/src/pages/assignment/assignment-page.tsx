import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import AssignmentBanner from "@/features/assignment/ui/assignment-banner";
import { cn } from "@/shared/lib/utils";
import { mockAssignments } from "@/shared/mocks/constant/assignment.mock";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";

export default function AssignmentPage() {
  return (
    <Flex direction="col" className="w-full">
      <AssignmentBanner />
      <Flex direction="col" className="w-full px-24 mb-24">
        <AssignmentList
          headerTitle="생성한 과제"
          assignments={mockAssignments}
          extraControls={
            <Button
              className={cn(
                "bg-[#8B1D1D] hover:bg-[#7A1919] text-white w-full text-lg font-medium",
                "w-[162px] h-[44px] px-4 box-border",
              )}
            >
              <Typography as="span" size="lg" weight="medium" color="white" className="mr-2">
                +
              </Typography>
              <Typography as="span" size="lg" weight="medium" color="white">
                과제 생성하기
              </Typography>
            </Button>
          }
        />
      </Flex>
    </Flex>
  );
}
