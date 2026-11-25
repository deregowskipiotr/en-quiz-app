
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Question, CardProgress } from "../../types/game";

interface GameCardProps {
  question: Question;
  number: number;
  index: number;
  progress: CardProgress;
  isOpen: boolean;
  onClick: () => void;
}

function GameCard({
  question,
  number,
  index,
  progress,
  isOpen,
  onClick,
}: GameCardProps) {
  const isCompleted =
    progress.status === "successful" || progress.status === "failed";

    const isActive = progress.status === "active";

const activeClass = isActive
  ? "quiz-card-active"
  : "";


  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.035,
        ease: "linear",
      }}
    >
      <button
        type="button"
        className={`quiz-card ${activeClass}`}
        data-status={progress.status}
        onClick={onClick}
        disabled={isCompleted || progress.status === "active"}
        aria-label={`Card ${number}, ${question.word}`}
        aria-pressed={isOpen}
      >
        <motion.span
          className="quiz-card-inner"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          {/* Card Front */}
          <span className="quiz-card-face quiz-card-front">
            <span className="absolute top-3 left-3 text-[10px] text-accent/60">
              MYSTERY CARD
            </span>

            <span className="font-accent text-5xl sm:text-6xl text-text">
              {String(number).padStart(2, "0")}
            </span>

            <span className="mt-3 text-[10px] sm:text-xs text-text/45">
              {isCompleted
                ? progress.status === "successful"
                  ? "COMPLETED"
                  : "FAILED"
                : "CLICK TO REVEAL"}
            </span>

            <span className="absolute bottom-3 right-3 text-accent/60">
              <Sparkles size={15} strokeWidth={1.5} />
            </span>
          </span>

          {/* Card Back */}
          <span className="quiz-card-face quiz-card-back relative gap-0 md:gap-5 ">
            <span className="absolute text-[6px] md:text-[10px] top-3 left-3 text-accent">
              CARD {String(number).padStart(2, "0")}
            </span>

            <span className="font-accent text-xl sm:text-2xl text-text text-center mt-0 md:mt-8">
              {question.word}
            </span>

            <span className="mt-4 md:mt-8 text-[10px] text-text/50">
              FORBIDDEN WORDS
            </span>

            <span className="mt-2 md:mt-0 flex flex-wrap justify-center gap-2 px-3">
              {question.forbiddenWords.map((word) => (
                <span
                  key={word}
                  className="rounded-sm border border-accent/30 bg-accent/5 px-2 py-1 text-[10px] text-text/80"
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}

export default GameCard;
