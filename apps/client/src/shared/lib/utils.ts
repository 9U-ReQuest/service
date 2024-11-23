import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const combinePrompt = (contents: string[]) => {
  return contents.join("/");
};

export const getDate = (lastUpdated?: string) => {
  return (lastUpdated ? new Date(lastUpdated) : new Date()).toLocaleDateString();
};
