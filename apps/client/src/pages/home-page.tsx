import AssignmentListProvider from "@/entities/assignment/ui/card/assignment-list-provider";
import HomeBanner from "@/features/home/ui/home-banner";
import PopularAssignment from "@/features/home/ui/popular-assignment/popular-assignment";

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeBanner />
      <div className="px-24">
        <PopularAssignment />
      </div>
      <hr className="my-12 " />
      <div className="px-24">
        <AssignmentListProvider />
      </div>
    </div>
  );
}
