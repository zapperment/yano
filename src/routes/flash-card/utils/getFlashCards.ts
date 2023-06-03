import getFilePath from "./getFilePath";
import getNoteNames from "./getNoteNames";
import getNoteNumbers from "./getNoteNumbers";

export default function getFlashCards(flashCardCodes: string[]) {
  return flashCardCodes.map((code) => ({
    file: getFilePath(code),
    noteNames: getNoteNames(code),
    noteNumbers: getNoteNumbers(code),
  }));
}
