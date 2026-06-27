import { describe, expect, test } from "vitest";
import chart from "../components/ItrChart.astro?raw";
import interfacePage from "../pages/interfaces/[id].astro?raw";

describe("layout text widths", () => {
  test("chart caption and comparability caveat are not capped to prose width", () => {
    expect(chart).not.toMatch(/figcaption\s*\{[^}]*max-width/s);
    expect(interfacePage).not.toMatch(/\.caveat\s*\{[^}]*max-width/s);
  });
});
