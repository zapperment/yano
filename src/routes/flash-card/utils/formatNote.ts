export default function formatNote(noteCode: string) {
  return noteCode
    .replaceAll("#", "♯")
    .replace(/^([a-g])b/, "$1♭")
    .toUpperCase();
}
