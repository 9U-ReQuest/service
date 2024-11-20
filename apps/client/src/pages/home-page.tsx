import AllAssignment from "@/features/home/ui/all-assignment";
import Banner from "@/features/home/ui/banner";
import PopularAssignment from "@/features/home/ui/popular-assignment";

export default function HomePage() {
  return (
    <div className="w-full">
      <Banner />
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
