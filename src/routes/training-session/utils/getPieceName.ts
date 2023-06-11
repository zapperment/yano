import { pieceNames } from "~/config";

export default function getPieceName(code: string) {
  const [pieceCode] = code.split("_");
  return pieceNames[pieceCode];
}
