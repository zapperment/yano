/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./flash-card.module.css";
import { getRandomItem, getFlashCards } from "./utils";
import type { MIDIMessageEvent, MIDIAccess } from "webmidi";
import { Success } from "~/components/emojis/success";
import { Failure } from "~/components/emojis/failure";

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

function getNextFlashCard() {
  return getRandomItem(flashCards);
}

enum Status {
  NONE,
  SUCCESS,
  FAILURE,
}

export default component$(() => {
  const flashCard = useSignal(getNextFlashCard());
  const notesToGuess = useSignal([...flashCard.value.noteNumbers]);
  const result = useSignal(Status.NONE);

  useVisibleTask$(async () => {
    function handleMidiMessage(event: MIDIMessageEvent) {
      console.log("notes to guess:", notesToGuess.value);
      const [status, note, velocity] = event.data;

      // ignore an MIDI message except note on
      if (velocity === 0 || status > 144 || status > 160) {
        return;
      }

      if (notesToGuess.value.includes(note)) {
        const index = notesToGuess.value.indexOf(note);
        notesToGuess.value.splice(index, 1);
        console.log("Received correct note", note);
        if (notesToGuess.value.length === 0) {
          console.log("Success");
          result.value = Status.SUCCESS;
          flashCard.value = getNextFlashCard();
          notesToGuess.value = [...flashCard.value.noteNumbers];
        }
      } else {
        console.log("Failure, received note", note);
        result.value = Status.FAILURE;
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
    console.log("request midi access succeeded");
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
      {result.value === Status.SUCCESS && <Success />}
      {result.value === Status.FAILURE && <Failure />}
    </>
  );
});
