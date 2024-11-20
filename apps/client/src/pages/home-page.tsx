import { mockListings } from "@/entities/assignment/mocks";
import AssignmentList from "@/entities/assignment/ui/card/assignment-list";
import HomeBanner from "@/features/home/ui/home-banner";
import PopularAssignment from "@/features/home/ui/popular-assignment";

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeBanner />
      <div className="px-24">
        <PopularAssignment />
      </div>
      <hr className="my-12 " />
      <div className="px-24">
        {/* Todo) fetch */}
        <AssignmentList
          extraControls={<div>전체 기업과제 확인하기 &gt;</div>}
          isPagination={false}
          cards={mockListings}
          headerTitle="전체 과제"
        />
      </div>
    </div>
  );
}
