const notes: Record<string, number> = {
  c: 0,
  "c#": 1,
  db: 1,
  d: 2,
  "d#": 3,
  eb: 3,
  e: 4,
  f: 5,
  "f#": 6,
  gb: 6,
  g: 7,
  "g#": 8,
  ab: 8,
  a: 9,
  "a#": 10,
  bb: 10,
  b: 11,
};

export default function getNoteNumbers(code: string) {
  const codeParts = code.toLowerCase().split("-");
  return codeParts.map((note) => {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1), 10);
    return notes[noteName] + 12 * (octave + 1);
  });
}
