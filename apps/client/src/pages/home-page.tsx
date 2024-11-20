import AllAssignment from "@/features/home/ui/all-assignment";
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
        <AllAssignment />
      </div>
    </div>
  );
}
