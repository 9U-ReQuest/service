import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import HomeBanner from "@/features/home/ui/home-banner";
import PopularAssignment from "@/features/home/ui/popular-assignment/popular-assignment";
import { ROUTES } from "@/shared/constant/url";
import { mockAssignments } from "@/shared/mocks/constant/assignment.mock";
import Typography from "@/shared/ui/common/typography/typography";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeBanner />
      <div className="px-24">
        <PopularAssignment />
      </div>
      <hr className="my-12 " />
      <div className="px-24">
        <AssignmentList
          extraControls={
            <Link href={ROUTES.ASSIGNMENT_BUSINESS} passHref legacyBehavior>
              <Typography as="a">전체 기업과제 확인하기 &gt;</Typography>
            </Link>
          }
          isPagination={false}
          assignments={mockAssignments}
          headerTitle="전체 과제"
        />
      </div>
    </div>
  );
}
