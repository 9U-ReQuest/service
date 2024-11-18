import { http, HttpResponse } from "msw";
import { store } from "./store";

export const handlers = [
  http.get("https://api.example.com/v1/users", () => {
    return HttpResponse.json(store.getUsers());
  }),
];
