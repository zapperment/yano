export default function getNoteNames(code: string) {
  const chordNotes = code.toLowerCase().split("-");
  return chordNotes
    .map((note) => note.slice(0, -1).toUpperCase().replaceAll("#", "♯"))
    .join("–");
}
