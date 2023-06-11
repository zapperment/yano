import notes from "./notes";

export default function getNoteNameFromNumber(noteNumber: number) {
  const octave = Math.floor(noteNumber / 12) - 1;
  const noteIndex = noteNumber % 12;
  const [noteName] =
    Object.entries(notes).find(([, value]) => value === noteIndex) || [];
  return `${noteName}${octave}`;
}
