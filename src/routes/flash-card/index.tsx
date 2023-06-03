import { component$ } from "@builder.io/qwik";
import styles from "./flash-card.module.css";
import { getRandomItem, getFlashCards } from "./utils";

export const flashCardCodes = [
  "a2",
  "a3",
  "a4-c#5-e5",
  "a4-d5-f#5",
  "cs3",
  "d3",
  "e3",
  "f#3",
];

const flashCards = getFlashCards(flashCardCodes);

export default component$(() => {
  const { file, noteNames } = getRandomItem(flashCards);
  // eslint-disable-next-line qwik/jsx-img
  return <img alt={noteNames} class={styles.flashCard} src={file} />;
});
