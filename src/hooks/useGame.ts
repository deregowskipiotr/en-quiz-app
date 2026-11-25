
import { useCallback, useEffect, useState } from "react";
import { GAME_CONFIG } from "../data/gameConfig";
import { QUESTIONS } from "../data/questions";
import type {
  CardProgress,
  GameStatus,
  FailureReason,
} from "../types/game";
import { shuffleArray } from "../utils/shuffle";

const createInitialProgress = (): Record<string, CardProgress> =>
  Object.fromEntries(
    QUESTIONS.map((question) => [
      question.id,
      {
        status: "available",
        mistakes: 0,
        timeRemaining: GAME_CONFIG.timeLimit,
        failureReason: null,
      },
    ])
  );

export function useGame() {
  const [cardProgress, setCardProgress] = useState(createInitialProgress);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardOrder, setCardOrder] = useState(() =>
    QUESTIONS.map((question) => question.id)
  );

  const activeCard =
    QUESTIONS.find((question) => question.id === activeCardId) ?? null;

  const progress = activeCardId ? cardProgress[activeCardId] : null;

  const completedCount = Object.values(cardProgress).filter(
    (card) => card.status === "successful" || card.status === "failed"
  ).length;

  const successfulCount = Object.values(cardProgress).filter(
    (card) => card.status === "successful"
  ).length;

  const failedCount = Object.values(cardProgress).filter(
    (card) => card.status === "failed"
  ).length;

  const gameStatus: GameStatus =
    completedCount === QUESTIONS.length ? "complete" : "playing";

  const finishCard = useCallback(
    (
      cardId: string,
      status: "successful" | "failed",
      failureReason: FailureReason | null = null
    ) => {
      setCardProgress((current) => {
        const card = current[cardId];

        if (!card || card.status !== "active") return current;

        return {
          ...current,
          [cardId]: {
            ...card,
            status,
            failureReason,
          },
        };
      });

      setActiveCardId((current) =>
        current === cardId ? null : current
      );
    },
    []
  );

  const openCard = useCallback(
    (cardId: string) => {
      if (gameStatus !== "playing" || activeCardId !== null) return;

      setCardProgress((current) => {
        const card = current[cardId];

        if (!card || card.status !== "available") return current;

        return {
          ...current,
          [cardId]: {
            ...card,
            status: "active",
            timeRemaining: GAME_CONFIG.timeLimit,
          },
        };
      });

      setActiveCardId((current) =>
        current === null ? cardId : current
      );
    },
    [activeCardId, gameStatus]
  );

  const registerCorrectAnswer = useCallback(() => {
    if (!activeCardId) return;

    finishCard(activeCardId, "successful");
  }, [activeCardId, finishCard]);

  const registerMistake = useCallback(() => {
    if (!activeCardId || !progress || progress.status !== "active") return;

    const mistakes = progress.mistakes + 1;
    const failed = mistakes >= GAME_CONFIG.maxMistakes;

    setCardProgress((current) => {
      const card = current[activeCardId];

      if (!card || card.status !== "active") return current;

      return {
        ...current,
        [activeCardId]: {
          ...card,
          mistakes,
          status: failed ? "failed" : "active",
          failureReason: failed ? "too-many-mistakes" : null,
        },
      };
    });

    if (failed) {
      setActiveCardId((current) =>
        current === activeCardId ? null : current
      );
    }
  }, [activeCardId, progress]);

  const registerForbiddenWord = useCallback(() => {
    if (!activeCardId) return;

    finishCard(activeCardId, "failed", "forbidden-word");
  }, [activeCardId, finishCard]);

  // Independent card timer
  useEffect(() => {
    if (
      !activeCardId ||
      !progress ||
      progress.status !== "active" ||
      progress.timeRemaining <= 0
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const cardTimedOut = progress.timeRemaining <= 1;

      setCardProgress((current) => {
        const card = current[activeCardId];

        if (!card || card.status !== "active") return current;

        const timeRemaining = Math.max(0, card.timeRemaining - 1);

        return {
          ...current,
          [activeCardId]: {
            ...card,
            timeRemaining,
            status: cardTimedOut ? "failed" : "active",
            failureReason: cardTimedOut ? "time-expired" : null,
          },
        };
      });

      if (cardTimedOut) {
        setActiveCardId((current) =>
          current === activeCardId ? null : current
        );
      }
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [activeCardId, progress]);

  const shuffleCards = useCallback(() => {
    if (activeCardId || gameStatus === "complete") return;

    setCardOrder((current) => shuffleArray(current));
  }, [activeCardId, gameStatus]);

  const resetGame = useCallback(() => {
    setCardProgress(createInitialProgress());
    setActiveCardId(null);
    setCardOrder(QUESTIONS.map((question) => question.id));
  }, []);

  return {
    questions: cardOrder.map(
      (id) => QUESTIONS.find((question) => question.id === id)!
    ),
    cardProgress,
    activeCard,
    activeCardId,
    progress,
    gameStatus,
    completedCount,
    successfulCount,
    failedCount,
    openCard,
    registerCorrectAnswer,
    registerMistake,
    registerForbiddenWord,
    shuffleCards,
    resetGame,
  };
}
