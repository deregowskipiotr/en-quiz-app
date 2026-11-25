
import { Clock3 } from "lucide-react";

interface GameTimerProps {
  timeRemaining: number;
}

function GameTimer({ timeRemaining }: GameTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const isCritical = timeRemaining <= 15;

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-md border px-4 py-3 ${
        isCritical
          ? "border-fail text-fail"
          : "border-accent/30 text-text"
      }`}
      role="timer"
      aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
    >
      <Clock3
        size={18}
        className={isCritical ? "text-fail" : "text-accent"}
      />

      <span className="font-accent text-2xl tabular-nums">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

export default GameTimer;
