export default function formatNote(noteCode: string) {
  return noteCode
    .replace("s", "♯")
    .replace(/^([a-g])b/, "$1♭")
    .toUpperCase();
}
