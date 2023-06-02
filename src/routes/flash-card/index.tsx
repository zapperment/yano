import { component$ } from "@builder.io/qwik";
import styles from "./flash-card.module.css";

const flashCardCodes = [
  "a2",
  "a3",
  "a4-c#5-e5",
  "a4-d5-f#5",
  "c3",
  "d3",
  "e3",
  "f#3",
];

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

const flashCards = flashCardCodes.map((code) => ({
  file: getFilePath(code),
  noteNames: getNoteNames(code),
  noteNumbers: getNoteNumbers(code),
}));

export default component$(() => {
  const { file, noteNumbers, noteNames } = getRandomFlashCard();
  console.log("[PH_LOG] noteNumbers:", noteNumbers); // PH_TODO#
  return <img alt={noteNames} class={styles.flashCard} src={file} />;
});

function getFilePath(image: string) {
  return `/images/flash-cards/${image.replaceAll("#", "s")}.png`;
}

function getRandomFlashCard() {
  return flashCards[Math.floor(Math.random() * flashCards.length)];
}

function getNoteNumbers(code: string) {
  const chordNotes = code.toLowerCase().split("-");
  return chordNotes.map((note) => {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1), 10);
    return notes[noteName] + 12 * (octave + 1);
  });
}

function getNoteNames(code: string) {
  const chordNotes = code.toLowerCase().split("-");
  return chordNotes
    .map((note) => note.slice(0, -1).toUpperCase().replaceAll("#", "♯"))
    .join("–");
}
