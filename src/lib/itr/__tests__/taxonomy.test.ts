import { describe, expect, test } from "vitest";
import { systemOf, techniqueOf } from "../taxonomy";

describe("system classification (chart color)", () => {
  test("invasive sensing modalities collapse to one invasive-BCI system", () => {
    expect(systemOf("Intracortical")).toBe("invasive-bci");
    expect(systemOf("ECoG")).toBe("invasive-bci");
    expect(systemOf("Endovascular")).toBe("invasive-bci");
  });
  test("EEG is the non-invasive BCI system", () => {
    expect(systemOf("EEG")).toBe("noninvasive-bci");
  });
  test("muscle / articulatory sensing groups together", () => {
    expect(systemOf("sEMG")).toBe("muscle");
    expect(systemOf("Electropalatography")).toBe("muscle");
  });
  test("unlisted modalities fall back to the mechanical / body system", () => {
    expect(systemOf("Manual")).toBe("mechanical");
    expect(systemOf("Tongue")).toBe("mechanical");
    expect(systemOf("Head")).toBe("mechanical");
  });
});

describe("technique classification (chart symbol)", () => {
  test("same EEG/motor-imagery modality splits by paradigm", () => {
    // Hex-o-Spell selects letters; the SMR cursor points — same sensing, different technique.
    expect(techniqueOf(["EEG", "Motor imagery"])).toBe("selection");
    expect(techniqueOf(["EEG", "Motor imagery", "Cursor"])).toBe("pointing");
  });
  test("speech wins over a co-present cursor tag", () => {
    expect(techniqueOf(["Intracortical", "Speech", "Cursor"])).toBe("speech");
  });
  test("evoked-potential spellers are selection", () => {
    expect(techniqueOf(["EEG", "P300"])).toBe("selection");
    expect(techniqueOf(["EEG", "SSVEP"])).toBe("selection");
    expect(techniqueOf(["EEG", "c-VEP"])).toBe("selection");
    expect(techniqueOf(["Endovascular", "Switch"])).toBe("selection");
  });
  test("dwell eye-typing and handwriting are typing", () => {
    expect(techniqueOf(["Eye", "Gaze"])).toBe("typing");
    expect(techniqueOf(["Intracortical", "Handwriting"])).toBe("typing");
    expect(techniqueOf(["Manual", "Telegraph"])).toBe("typing");
  });
  test("physical and neural cursors share the pointing technique", () => {
    expect(techniqueOf(["Manual", "Pointing"])).toBe("pointing");
    expect(techniqueOf(["Intracortical", "Cursor"])).toBe("pointing");
  });
});
