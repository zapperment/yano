import type { FlashCard } from "./FlashCard";

export type Result = {
  attempt: number;
  flashCard: FlashCard;
  success: boolean;
  time: number;
};
