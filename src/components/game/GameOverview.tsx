
import GameStats from "./GameStats";

interface GameOverviewProps {
  successfulCount: number;
  failedCount: number;
  completedCount: number;
}

function GameOverview({
  successfulCount,
  failedCount,
  completedCount,
}: GameOverviewProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-accent text-xl sm:text-2xl">
          Game Overview
        </h2>

        <span className="text-xs text-accent/70">
          READY TO PLAY
        </span>
      </div>

      <GameStats
        successfulCount={successfulCount}
        failedCount={failedCount}
        completedCount={completedCount}
      />
    </section>
  );
}

export default GameOverview;

