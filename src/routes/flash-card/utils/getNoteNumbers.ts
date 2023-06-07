import notes from "./notes";
import formatNote from "~/routes/flash-card/utils/formatNote";

export default function getNoteNumbers(code: string) {
  const codeParts = code.split("-");
  return codeParts.map((note) => {
    const noteCode = note.slice(0, -1);
    const octave = parseInt(note.slice(-1), 10);
    return notes[formatNote(noteCode)] + 12 * (octave + 1);
  });
}
