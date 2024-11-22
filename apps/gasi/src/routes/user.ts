import type { User } from "@request/specs";
import { p } from "../trpc.js";

export const me = p.query(
  (): User => ({
    id: "673f25db6a52140e5bc47f75",
    name: "구효민",
    email: "hyomin@soongsil.ac.kr",
    registered: true,
    providers: {
      kakao: {
        uid: "230549202",
        connectedAt: "2024-11-21T12:25:34.710Z",
      },
    },
    submissions: [],
    prompt: {
      fields: ["프론트엔드", "서버/백엔드"],
      techs: ["Spring Boot", "Rust"],
      companies: ["kakao", "goorm"],
    },
  }),
);
