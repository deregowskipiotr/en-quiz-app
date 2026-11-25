
import GameCard from "./GameCard";
import type { Question, CardProgress } from "../../types/game";

interface GameGridProps {
  questions: Question[];
  cardProgress: Record<string, CardProgress>;
  activeCardId: string | null;
  openCard: (cardId: string) => void;
}

function GameGrid({
  questions,
  cardProgress,
  activeCardId,
  openCard,
}: GameGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {questions.map((question, index) => (
        <GameCard
          key={question.id}
          question={question}
          number={index + 1}
          index={index}
          progress={cardProgress[question.id]}
          isOpen={activeCardId === question.id}
          onClick={() => openCard(question.id)}
        />
      ))}
    </div>
  );
}

export default GameGrid;
