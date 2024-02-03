import clsx, { ClassValue } from "clsx";
import test from "node:test";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
