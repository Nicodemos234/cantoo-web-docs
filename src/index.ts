import type { Cantoo } from "./types";
export type {
  Cantoo,
  Text2Speech,
  CantooWebData,
  AccessibilityOptions,
  PluginOptionsData,
  VocalDictationData,
  VocalReadingData,
  Speech2Text,
  Voice,
  UsageEvent,
} from "./types";

export function loadCantoo(src: string): Promise<Cantoo> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (window.Cantoo) return resolve(window.Cantoo);

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => {
      console.log("Cantoo script loaded");
      if (window.Cantoo) resolve(window.Cantoo);
      else reject(new Error("Cantoo not found on window"));
    };
    s.onerror = () => reject(new Error("Failed to load Cantoo script"));
    document.head.appendChild(s);
  });
}
