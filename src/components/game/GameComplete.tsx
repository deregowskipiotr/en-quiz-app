
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

interface GameCompleteProps {
  successfulCount: number;
  failedCount: number;
  onReset: () => void;
}

function GameComplete({
  successfulCount,
  failedCount,
  onReset,
}: GameCompleteProps) {
  return (
    <section className="glass-panel rounded-md p-6 sm:p-10 text-center">
      <div className="flex justify-center mb-5">
        <Trophy
          size={42}
          strokeWidth={1.3}
          className="text-accent"
        />
      </div>

      <p className="text-[10px] tracking-widest text-accent mb-3">
        ROUND FINISHED
      </p>

      <h2 className="font-accent text-3xl sm:text-4xl text-text">
        Round Complete
      </h2>

      <p className="mt-3 text-sm text-text/50">
        All challenges have been completed. Well played!
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
        <div className="rounded-md border border-successful/40 bg-successful/5 p-4">
          <CheckCircle2
            size={22}
            className="mx-auto text-successful"
          />

          <span className="block mt-2 text-[10px] text-text/45">
            SUCCESSFUL
          </span>

          <span className="block mt-1 font-accent text-3xl text-text">
            {successfulCount}
          </span>
        </div>

        <div className="rounded-md border border-fail/40 bg-fail/5 p-4">
          <XCircle
            size={22}
            className="mx-auto text-fail"
          />

          <span className="block mt-2 text-[10px] text-text/45">
            FAILED
          </span>

          <span className="block mt-1 font-accent text-3xl text-text">
            {failedCount}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex w-full md:w-md items-center justify-center gap-2 mt-8 rounded-md border border-accent/40 bg-accent/10 px-6 py-3 text-sm text-text transition-colors duration-500 hover:bg-accent/20 hover:border-accent cursor-pointer"
      >
        <RotateCcw size={16} className="text-accent" />
        Start New Round
      </button>
    </section>
  );
}

export default GameComplete;
