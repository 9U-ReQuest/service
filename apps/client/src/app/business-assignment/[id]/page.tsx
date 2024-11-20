import AssignmentDetailPage from "@/pages/assignment-detail-page";
import type { PromiseParams } from "@/shared/types";

export default function AssignmentDetail(props: PromiseParams<{ id: string }>) {
  return <AssignmentDetailPage {...props} />;
}
