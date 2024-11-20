import type { AssingmentCardList } from "./types/assignment.type";

export const mockListings: AssingmentCardList = [
  {
    id: "1",
    company: {
      name: "AI",
      category: "SAMSUNG",
      logo: "/placeholder.svg",
    },
    title: "모두를 위한 AI 서비스 개발",
    date: "2024/10/16",
    isBookmarked: true,
  },
  {
    id: "2",
    company: {
      name: "모빌리티",
      category: "현대자동차",
      logo: "/placeholder.svg",
    },
    title: "2023 1분기 현대 오토에버 과제전형",
    date: "2024/01/25",
  },
  // Add more mock listings as needed
];
