
import { Check, X, Ban, AlertTriangle } from "lucide-react";
import GameTimer from "./GameTimer";

interface GameControlsProps {
  timeRemaining: number;
  mistakes: number;
  maxMistakes: number;
  onCorrectAnswer: () => void;
  onMistake: () => void;
  onForbiddenWord: () => void;
}

function GameControls({
  timeRemaining,
  mistakes,
  maxMistakes,
  onCorrectAnswer,
  onMistake,
  onForbiddenWord,
}: GameControlsProps) {
  const mistakesRemaining = maxMistakes - mistakes;

  return (
    <section className="glass-panel rounded-md p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Header and current challenge status */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-accent text-2xl">
              Game Controls
            </h3>

            <p className="mt-1 text-xs text-text/45">
              Manage the current challenge.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GameTimer timeRemaining={timeRemaining} />

            <div className="rounded-md border border-accent/30 px-5 py-3 text-center">
              <span className="block text-[10px] tracking-wider text-text/45">
                MISTAKES
              </span>

              <span className="font-accent text-2xl text-text tabular-nums">
                {String(mistakes).padStart(2, "0")}
                <span className="text-text/35"> / </span>
                {String(maxMistakes).padStart(2, "0")}
              </span>

              <span className="block text-[10px] text-text/45">
                {mistakesRemaining} remaining
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* Correct Answer */}
          <button
            type="button"
            onClick={onCorrectAnswer}
            className="group flex flex-col items-center justify-center gap-2 rounded-md border border-successful/50 bg-successful/10 px-4 py-5 text-text transition-all duration-500 ease-linear hover:border-successful hover:bg-successful/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-successful"
          >
            <Check
              size={22}
              className="text-successful transition-transform duration-500 group-hover:scale-110"
            />

            <span className="text-sm font-medium">
              Correct Answer
            </span>

            <span className="text-[10px] text-text/45">
              Challenge completed successfully
            </span>
          </button>

          {/* Incorrect Guess */}
          <button
            type="button"
            onClick={onMistake}
            className="group flex flex-col items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/5 px-4 py-5 text-text transition-all duration-500 ease-linear hover:border-accent hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <X
              size={22}
              className="text-accent transition-transform duration-500 group-hover:rotate-90"
            />

            <span className="text-sm font-medium">
              Incorrect Guess
            </span>

            <span className="text-[10px] text-text/45">
              Register one mistake
            </span>
          </button>

          {/* Forbidden Word */}
          <button
            type="button"
            onClick={onForbiddenWord}
            className="group flex flex-col items-center justify-center gap-2 rounded-md border border-fail/50 bg-fail/10 px-4 py-5 text-text transition-all duration-500 ease-linear hover:border-fail hover:bg-fail/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fail"
          >
            <Ban
              size={22}
              className="text-fail transition-transform duration-500 group-hover:rotate-12"
            />

            <span className="text-sm font-medium">
              Forbidden Word
            </span>

            <span className="flex items-center gap-1 text-[10px] text-fail/80">
              <AlertTriangle size={11} />
              Immediate card failure
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}

export default GameControls;
