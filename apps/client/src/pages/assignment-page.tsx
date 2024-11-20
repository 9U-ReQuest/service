import AssignmentBanner from "@/features/assignment/assignment-banner";
import CreatedAssignment from "@/features/assignment/created-assignment";

export default function AssignmentPage() {
  return (
    <div className="w-full flex flex-col">
      <AssignmentBanner />
      <div className="w-full px-24 mb-24">
        <CreatedAssignment />
      </div>
    </div>
  );
}
