import notes from "./notes";
import formatNote from "~/routes/flash-card/utils/formatNote";

const regExp = /^([a-g][bs]?)(-?[0-9])(\.[0-9]+)?/;

export default function getNoteNumbers(code: string) {
  const [, , ,notesCode] = code.split("_");
  const codeParts = notesCode.split("-");
  return codeParts.map((codePart) => {
    const noteCode = codePart.replace(regExp, "$1");
    const octave = parseInt(codePart.replace(regExp, "$2"), 10);
    return notes[formatNote(noteCode)] + 12 * (octave + 1);
  });
}
