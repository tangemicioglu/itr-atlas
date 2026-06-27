import { describe, expect, test } from "vitest";
import chart from "../components/ItrChart.astro?raw";

describe("ITR chart rendering", () => {
  test("log axis extends down to 1 bit per minute", () => {
    expect(chart).toContain("Math.log10(1)");
    expect(chart).toContain("const yticks = [1, 10, 100, 1000]");
  });

  test("rebuilt x-axis gridlines keep their SVG presentation styling", () => {
    expect(chart).toContain('line.setAttribute("stroke", "var(--hairline)")');
    expect(chart).toContain('line.setAttribute("stroke-width", "1")');
    expect(chart).toContain('text.setAttribute("fill", "var(--muted)")');
  });
});
