// @ts-ignore (I have no idea why TypeScript thinks there is no index.d.ts in the webmidi package)
import type { MIDIMessageEvent, MIDIAccess } from "webmidi";
import { $ } from "@builder.io/qwik";
import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

import type { FlashCard, Result } from "~/types";
import { getFlashCards, getRandomItem } from "~/routes/training-session/utils"
import { flashCardCodes } from "~/config";

const flashCards = getFlashCards(flashCardCodes);

function getNextFlashCard(prevFlashCard?: FlashCard) {
  return getRandomItem(flashCards, prevFlashCard);
}

export default function useTrainingSession() {
  const results: Signal<Result[]> = useSignal([]);
  const flashCard = useSignal(getNextFlashCard());
  const notesToGuess = useSignal([...flashCard.value.noteNumbers]);
  const timer = useSignal(Date.now());

  const handleResult = $(function handleResult(success: boolean) {
    results.value.push({
      attempt: results.value.length + 1,
      success,
      flashCard: flashCard.value,
      time: Date.now() - timer.value,
    });
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

  return {
    flashCard,
    results,
  };
}
