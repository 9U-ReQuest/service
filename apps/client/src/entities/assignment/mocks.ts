import type { AssingmentCardList } from "./types/assignment.type";

export const mockListings: AssingmentCardList = [];
for (let i = 0; i < 100; i++) {
  // {
  //   id: "1",
  //   company: {
  //     name: "AI",
  //     category: "SAMSUNG",
  //     logo: "/placeholder.svg",
  //   },
  //   title: "모두를 위한 AI 서비스 개발",
  //   date: "2024/10/16",
  //   isBookmarked: true,
  // }
  mockListings.push({
    id: `${i}`,
    company: {
      name: "AI",
      category: "SAMSUNG",
      logo: "/placeholder.svg",
    },
    title: `모두를 위한 AI 서비스 개발 ${i}`,
    date: "2024/10/16",
    isBookmarked: true,
  });
}
