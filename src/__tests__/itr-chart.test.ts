import { describe, expect, test } from "vitest";
import chart from "../components/ItrChart.astro?raw";

describe("ITR chart rendering", () => {
  test("log axis extends down to 0.01 bits per second", () => {
    expect(chart).toContain("const yMin = 0.01, yMax = 20");
    // Ceiling is labelled (20) so the frame top isn't a bare partial decade.
    expect(chart).toContain("const yticks = [0.01, 0.1, 1, 10, 20]");
  });

  test("y-ceiling adapts past the default when high score types are selected", () => {
    expect(chart).toContain("const Y_TIERS = [20, 100, 1000]");
    expect(chart).toContain("function fitY()");
  });

  test("rebuilt x-axis gridlines keep their SVG presentation styling", () => {
    expect(chart).toContain('line.setAttribute("stroke", "var(--hairline)")');
    expect(chart).toContain('line.setAttribute("stroke-width", "1")');
    expect(chart).toContain('text.setAttribute("fill", "var(--muted)")');
  });
});
