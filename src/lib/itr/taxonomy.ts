// Two orthogonal axes label every interface entry:
//   system:    how the signal is sensed (the hardware / biological source) → chart COLOR
//   technique: the interaction paradigm the user performs                  → chart SYMBOL
// They are independent so the chart reads on both axes at once: e.g. an
// intracortical cursor and a mouse share the "pointing" symbol but differ in
// colour, while an EEG speller and an EEG cursor share a colour but differ in
// symbol.

export interface SystemDef {
  key: string;
  label: string;
  color: string;
}
export type Shape = "circle" | "square" | "triangle" | "diamond";
export interface TechniqueDef {
  key: string;
  label: string;
  shape: Shape;
}

export const SYSTEMS: SystemDef[] = [
  { key: "invasive-bci", label: "Invasive BCI", color: "#8A2E2E" },
  { key: "noninvasive-bci", label: "Non-invasive BCI", color: "#24407A" },
  { key: "muscle", label: "Muscle / silent speech", color: "#2E7D6B" },
  { key: "voice", label: "Voice", color: "#B06A28" },
  { key: "eye", label: "Eye tracking", color: "#6A4C93" },
  { key: "mechanical", label: "Manual / body", color: "#7A8450" },
];

export const TECHNIQUES: TechniqueDef[] = [
  { key: "pointing", label: "Pointing", shape: "circle" },
  { key: "typing", label: "Typing", shape: "square" },
  { key: "speech", label: "Speech", shape: "diamond" },
  { key: "selection", label: "Selection / speller", shape: "triangle" },
];

// System is a clean function of the sensing modality. Anything not listed
// (Manual, Touch, Stylus, Tongue, Head, …) is a mechanical / bodily channel.
const SYSTEM_BY_SENSING: Record<string, string> = {
  Intracortical: "invasive-bci",
  ECoG: "invasive-bci",
  Endovascular: "invasive-bci",
  EEG: "noninvasive-bci",
  sEMG: "muscle",
  Electropalatography: "muscle",
  // Lip-reading is optical, not muscle-based, but it's folded under the
  // silent-speech color (it decodes articulation to language); the "Video" tag
  // on the card carries the real modality.
  Video: "muscle",
  Voice: "voice",
  Eye: "eye",
};

export function systemOf(sensingModality: string): string {
  return SYSTEM_BY_SENSING[sensingModality] ?? "mechanical";
}

// Technique is resolved by priority over the modality tags, because one sensing
// modality can drive several paradigms (EEG motor imagery runs both a cursor and
// a speller). Order matters: speech wins first so a combined speech+cursor neural
// system reads as speech; pointing next; then typing; everything else
// (SSVEP / P300 / c-VEP / switch / motor-imagery menus) is symbol selection.
const has = (tags: string[], ...names: string[]) => names.some((n) => tags.includes(n));

export function techniqueOf(modalityTags: string[]): string {
  if (has(modalityTags, "Speech", "Speech recognition", "Silent speech")) return "speech";
  if (has(modalityTags, "Pointing", "Cursor")) return "pointing";
  if (has(modalityTags, "Keyboard", "Chord keyboard", "Telegraph", "Handwriting", "Gaze"))
    return "typing";
  return "selection";
}

export const systemLabel = (k: string) => SYSTEMS.find((s) => s.key === k)?.label ?? k;
export const systemColor = (k: string) => SYSTEMS.find((s) => s.key === k)?.color ?? "#999";
export const techniqueLabel = (k: string) => TECHNIQUES.find((t) => t.key === k)?.label ?? k;
export const techniqueShape = (k: string): Shape =>
  TECHNIQUES.find((t) => t.key === k)?.shape ?? "circle";

// SVG markup for a technique's mark, centred at the origin, filled with `color`.
// Used both for the plotted points and for the legend glyphs.
export function markSvg(technique: string, color: string): string {
  const attrs = `class="mark" fill="${color}"`;
  switch (techniqueShape(technique)) {
    case "square":
      return `<rect ${attrs} x="-5" y="-5" width="10" height="10" rx="1.5" />`;
    case "triangle":
      return `<polygon ${attrs} points="0,-7.8 7.2,4.5 -7.2,4.5" />`;
    case "diamond":
      return `<polygon ${attrs} points="0,-6.8 6.8,0 0,6.8 -6.8,0" />`;
    default:
      return `<circle ${attrs} r="5.5" />`;
  }
}
