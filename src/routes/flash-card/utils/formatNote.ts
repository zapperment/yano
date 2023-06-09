export default function formatNote(noteCode: string) {
  return noteCode
    .replace(/\.[0-9]/, "")
    .replace("s", "♯")
    .replace(/^([a-g])b/, "$1♭")
    .toUpperCase();
}
