
export interface Question {
  id: string;
  word: string;
  forbiddenWords: string[];
}

export type CardStatus =
  | "available"
  | "active"
  | "successful"
  | "failed";

export interface CardProgress {
  status: CardStatus;
  mistakes: number;
  timeRemaining: number;
  failureReason: FailureReason | null;
}

export type GameStatus = "playing" | "complete";

export type FailureReason =
  | "forbidden-word"
  | "too-many-mistakes"
  | "time-expired";