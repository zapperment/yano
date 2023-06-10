import getFilePath from "./getFilePath";
import getNoteNames from "./getNoteNames";
import getNoteNumbers from "./getNoteNumbers";
import getPieceName from "~/routes/flash-card/utils/getPieceName";
import getBar from "~/routes/flash-card/utils/getBar";
import type { FlashCard } from "~/types";
import getHand from "./getHand";
import getStep from "./getStep";

export default function getFlashCards(flashCardCodes: string[]): FlashCard[] {
  const flashCards = flashCardCodes.map((code) => ({
    file: getFilePath(code),
    noteNames: getNoteNames(code),
    noteNumbers: getNoteNumbers(code),
    hand: getHand(code),
    piece: getPieceName(code),
    bar: getBar(code),
    step: getStep(code),
  }));
  console.log(flashCards);
  return flashCards;
}
