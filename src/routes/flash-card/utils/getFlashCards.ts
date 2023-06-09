import getFilePath from "./getFilePath";
import getNoteNames from "./getNoteNames";
import getNoteNumbers from "./getNoteNumbers";
import getPieceName from "~/routes/flash-card/utils/getPieceName";
import getBar from "~/routes/flash-card/utils/getBar";
import type { FlashCard } from "~/types";

export default function getFlashCards(flashCardCodes: string[]): FlashCard[] {
  return flashCardCodes.map((code) => ({
    file: getFilePath(code),
    noteNames: getNoteNames(code),
    noteNumbers: getNoteNumbers(code),
    piece: getPieceName(code),
    bar: getBar(code),
  }));
}
