import type { MetaData } from "./MetaData";

export type FlashCard = {
  file: string;
  noteNames: string;
  noteNumbers: number[];
  piece: MetaData;
  bar: number;
};
