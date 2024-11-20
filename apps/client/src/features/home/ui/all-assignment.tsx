import { mockListings } from "@/entities/assignment/mocks";
import AssignmentCardList from "@/entities/assignment/ui/card/assignment-card-list";
import { ROUTES } from "@/shared/constant/url";
import Link from "next/link";

function AllAssignmentHeader({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between mb-16 text-xl">
      <h2 className="font-semibold">
        전체 과제 <span className="text-[#8A1B22] font-bold">({total})</span>
      </h2>
      <Link href={ROUTES.BUSINESS_ASSIGNMENT} className="text-[#393939]">
        전체 기업과제 확인하기 &gt;
      </Link>
    </div>
  );
}

export default function AllAssignment() {
  return (
    <section className="py-8">
      <AllAssignmentHeader total={100} />
      <AssignmentCardList cards={mockListings} />
    </section>
  );
}
