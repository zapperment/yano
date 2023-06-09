/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

import styles from "./flash-card.module.css";
import { getRandomItem, getFlashCards } from "./utils";
// @ts-ignore (I have no idea why TypeScript thinks there is no index.d.ts in the webmidi package)
import type { MIDIMessageEvent, MIDIAccess } from "webmidi";
import { Success, Failure } from "~/components/emojis";
import type { DocumentHead } from "@builder.io/qwik-city";
import { flashCardCodes } from "~/config";
import type { FlashCard } from "~/types";

const flashCards = getFlashCards(flashCardCodes);

function getNextFlashCard(prevFlashCard?: FlashCard) {
  return getRandomItem(flashCards, prevFlashCard);
}

type Result = {
  card: number;
  success: boolean;
  notes: string;
  time: number;
};

export default component$(() => {
  const results: Signal<Result[]> = useSignal([]);
  const flashCard = useSignal(getNextFlashCard());
  const notesToGuess = useSignal([...flashCard.value.noteNumbers]);
  const timer = useSignal(Date.now());

  const handleResult = $(function handleResult(success: boolean) {
    results.value.push({
      card: results.value.length + 1,
      success,
      notes: flashCard.value.noteNames,
      time: Date.now() - timer.value,
    });
    console.log("[PH_LOG] results:", results.value); // PH_TODO
    flashCard.value = getNextFlashCard(flashCard.value);
    notesToGuess.value = [...flashCard.value.noteNumbers];
    timer.value = Date.now();
  });

  useVisibleTask$(async () => {
    function handleMidiMessage(event: MIDIMessageEvent) {
      const [status, note, velocity] = event.data;

      // ignore an MIDI message except note on
      if (velocity === 0 || status > 144 || status > 160) {
        return;
      }

      if (notesToGuess.value.includes(note)) {
        const index = notesToGuess.value.indexOf(note);
        notesToGuess.value.splice(index, 1);
        if (notesToGuess.value.length === 0) {
          handleResult(true);
        }
      } else {
        handleResult(false);
      }
    }

    let midiAccess: MIDIAccess;
    try {
      midiAccess = await navigator.requestMIDIAccess();
    } catch (err) {
      alert("request midi access failed");
    }
    const inputs = midiAccess.inputs.values();
    for (const input of inputs) {
      input.onmidimessage = handleMidiMessage;
    }
  });

  return (
    <>
      <img
        alt={flashCard.value.noteNames}
        class={styles.flashCard}
        src={flashCard.value.file}
      />
      {results.value
        .slice(-10)
        .reverse()
        .map(({ card, success }) =>
          success ? (
            <Success key={`card${card}`} />
          ) : (
            <Failure key={`card${card}`} />
          )
        )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Yano",
  meta: [
    {
      name: "description",
      content: "Patrick's qwik piano webapp",
    },
  ],
};
