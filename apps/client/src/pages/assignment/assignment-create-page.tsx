"use client";
import type { InProgress } from "@/entities/assignment/create/schema/create-assignment-schema";
import ConfirmUserInfo from "@/features/assignment/create/components/funnels/confirm-userInfo";
import CreateSuccess from "@/features/assignment/create/components/funnels/create-success";
import CreatingAssignment from "@/features/assignment/create/components/funnels/creating-assignment";
import InputUserInfo from "@/features/assignment/create/components/funnels/input-userinfo";
import useCreateAssignmentfunnel from "@/features/assignment/create/hooks/use-create-assignment-funnel";
import { trpc } from "@/shared/api/trpc";

export default trpc.withTRPC(function AssignmentCreatePage() {
  const funnel = useCreateAssignmentfunnel();

  return (
    <funnel.Render
      ConfirmUserInfo={
        // onNext를 넘길 때, branch1, branch2로 분기처리할 수 있어야 함.
        ({ history }) => (
          <ConfirmUserInfo
            onNext={(branch: "InputUserInfo" | "InProgress", progressProps?: InProgress) =>
              history.push(branch, {
                ...(progressProps ? progressProps : undefined),
              })
            }
          />
        )
      }
      InputUserInfo={({ history }) => (
        <InputUserInfo
          onNext={(progressProps?: InProgress) =>
            history.push("InProgress", {
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              ...progressProps!,
            })
          }
        />
      )}
      InProgress={({ history, context }) => (
        <CreatingAssignment createProps={context} onNext={() => history.push("Completed")} />
      )}
      Completed={({ history }) => <CreateSuccess />}
    />
  );
});
