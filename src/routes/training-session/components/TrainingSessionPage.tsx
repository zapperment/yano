/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";

import styles from "./TrainingSessionPage.module.css";
import { Success, Failure } from "~/components/emojis";
import type { FlashCard, Result } from "~/types";

type Props = {
  flashCard: FlashCard;
  results: Result[];
};

export default ({ flashCard, results }: Props) => {
  return (
    <>
      <img
        alt={flashCard.noteNames}
        class={styles.flashCard}
        src={flashCard.file}
      />
      {results
        .slice(-10)
        .reverse()
        .map(({ attempt, success }) =>
          success ? (
            <Success key={`card${attempt}`} />
          ) : (
            <Failure key={`card${attempt}`} />
          )
        )}
    </>
  );
};
