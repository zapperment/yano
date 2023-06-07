import formatNote from "~/routes/flash-card/utils/formatNote";

export default function getNoteNames(code: string) {
  const chordNotes = code.split("-");
  return chordNotes.map(formatNote).join("–");
}
