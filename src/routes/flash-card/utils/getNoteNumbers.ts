import notes from "./notes";
import formatNote from "~/routes/flash-card/utils/formatNote";

export default function getNoteNumbers(code: string) {
  const codeParts = code.split("-");
  return codeParts.map((note) => {
    const noteCode = note.slice(0, -1);
    const octave = parseInt(note.slice(-1), 10);
    console.log("[PH_LOG] noteName:", noteCode); // PH_TODO
    console.log("[PH_LOG] octave:", octave); // PH_TODO
    return notes[formatNote(noteCode)] + 12 * (octave + 1);
  });
}
