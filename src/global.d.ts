import type { Cantoo } from "./types";

declare global {
  interface Window {
    Cantoo: Cantoo;
  }

  const Cantoo: Cantoo;
}

export {};
