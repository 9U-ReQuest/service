import type { ReviewEntry, ReviewResult } from "@request/specs";

export const createMockAssignment = (id: string, name: string) => ({
  id,
  name,
  description: "테스트용 과제입니다. 풀 수 있을까요?",
  readme: `# 테스트용 과제
테스트용 과제입니다. 마크다운 렌더링이 잘 될까요? \`안녕하세요\`
**안녕하세요** ~안녕하세요~
> 안녕하세요 ㅎㅎ

`,
  prompt: {
    fields: ["프론트엔드", "서버/백엔드"],
    techs: ["Spring Boot", "Rust"],
    companies: ["kakao", "goorm"],
  },
  status: "READY",
  lastUpdated: new Date().toISOString(),
});

export const createMockReviewEntry = (
  name: string,
  scenario: string,
  path: string | undefined,
  lineRange: [number, number] | undefined,
): ReviewEntry => {
  const score = Math.floor(Math.random() * 100);
  const result = Math.floor(score / 50);
  return {
    name,
    scenario,
    result: ["FAIL", "NEUTRAL", "GOOD"][result] as ReviewResult,
    score,
    message:
      result === 2
        ? "가수의 실력이시네요~"
        : result === 1
          ? "조금만 더 신나게 불러보세요!"
          : "진짜 못들어주겠네요~",
    ...(path && { path }),
    ...(lineRange && { lineRange }),
  };
};
