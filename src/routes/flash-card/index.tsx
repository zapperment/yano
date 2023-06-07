/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

import styles from "./flash-card.module.css";
import { getRandomItem, getFlashCards } from "./utils";
import type { MIDIMessageEvent, MIDIAccess } from "webmidi";
import { Success } from "~/components/emojis/success";
import { Failure } from "~/components/emojis/failure";
import getNoteNameFromNumber from "~/routes/flash-card/utils/getNoteNameFromNumber";

export const flashCardCodes = [
  "a2",
  "a3",
  "a4-c#5-e5",
  "a4-d5-f#5",
  "c#3",
  "d3",
  "e3",
  "f#3",
];

const flashCards = getFlashCards(flashCardCodes);

console.log("[PH_LOG] flashCards:", flashCards); // PH_TODO

function getNextFlashCard() {
  return getRandomItem(flashCards);
}

type Result = {
  card: number;
  success: boolean;
  notes: string;
  wrongNote?: string;
};

export default component$(() => {
  const results: Signal<Result[]> = useSignal([]);
  const flashCard = useSignal(getNextFlashCard());
  const notesToGuess = useSignal([...flashCard.value.noteNumbers]);

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
          results.value.push({
            card: results.value.length + 1,
            success: true,
            notes: flashCard.value.noteNames,
          });
          console.log("[PH_LOG] results:", results.value); // PH_TODO
          flashCard.value = getNextFlashCard();
          notesToGuess.value = [...flashCard.value.noteNumbers];
        }
      } else {
        results.value.push({
          card: results.value.length + 1,
          success: false,
          notes: flashCard.value.noteNames,
          wrongNote: getNoteNameFromNumber(note),
        });
        console.log("[PH_LOG] results:", results.value); // PH_TODO
        flashCard.value = getNextFlashCard();
        notesToGuess.value = [...flashCard.value.noteNumbers];
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
