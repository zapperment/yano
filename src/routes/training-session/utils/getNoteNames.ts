import formatNote from "./formatNote"

export default function getNoteNames(code: string) {
  const [, , ,notesCode] = code.split("_");
  const chordNotes = notesCode.split("-");
  return chordNotes.map(formatNote).join("–");
}
