"use client";

import OnboardingSuccess from "@/features/onboarding/profile/components/funnels/components/onboarding-success";
import InputField from "@/features/onboarding/profile/components/funnels/input-field";
import InputGithub from "@/features/onboarding/profile/components/funnels/input-github";
import InputName from "@/features/onboarding/profile/components/funnels/input-name";
import InputTechAndCompany from "@/features/onboarding/profile/components/funnels/input-tech-and-company";
import useOnboardingFunnel from "@/features/onboarding/profile/hooks/use-onboarding-funnel";
import { trpc } from "@/shared/api/trpc";

export default trpc.withTRPC(function OnboardingProfilePage() {
  const funnel = useOnboardingFunnel();

  return (
    <funnel.Render
      InputName={({ history }) => (
        <InputName onNext={(name) => history.push("InputGithub", { name })} />
      )}
      InputGithub={({ history }) => (
        <InputGithub onNext={(github) => history.push("SelectJob", { github })} />
      )}
      SelectJob={({ history }) => (
        <InputField onNext={(field) => history.push("InputTechAndCompany", { field })} />
      )}
      InputTechAndCompany={({ history, context }) => (
        <InputTechAndCompany
          context={context}
          onNext={(tech, company) =>
            history.push("Complete", {
              tech,
              company,
            })
          }
        />
      )}
      // InputEducation={({ history }) => (
      //   <CreateAssignment.InputEducation
      //     onBack={() => history.back()}
      //     onNext={(education) => history.push("Complete", { education })}
      //   />
      // )}
      Complete={() => (
        <OnboardingSuccess name={funnel.context.name} email={funnel.context.github} />
      )}
    />
  );
});
