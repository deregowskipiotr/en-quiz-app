
import type { ReactNode } from "react";
import {
  Layers3,
  Clock3,
  Target,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";

import { GAME_CONFIG } from "../../data/gameConfig";

interface StatItemProps {
  label: string;
  value: string;
  icon: ReactNode;
  description: string;
}

interface GameStatsProps {
  successfulCount: number;
  failedCount: number;
  completedCount: number;
}

function StatItem({ label, value, icon, description }: StatItemProps) {
  return (
    <div className="glass-panel rounded-md p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text/60">{label}</span>
        <span className="text-accent">{icon}</span>
      </div>

      <div className="mt-3 font-accent text-3xl sm:text-4xl text-text">
        {value}
      </div>

      <p className="mt-1 text-xs text-text/45">{description}</p>
    </div>
  );
}

function GameStats({
  successfulCount,
  failedCount,
  completedCount,
}: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <StatItem
        label="Total Cards"
        value={String(GAME_CONFIG.totalCards)}
        description="Challenges this round"
        icon={<Layers3 size={18} />}
      />

      <StatItem
        label="Time Limit"
        value={`${GAME_CONFIG.timeLimit}s`}
        description="Per active card"
        icon={<Clock3 size={18} />}
      />

      <StatItem
        label="Max Mistakes"
        value={String(GAME_CONFIG.maxMistakes).padStart(2, "0")}
        description="Incorrect guesses allowed"
        icon={<Target size={18} />}
      />

      <StatItem
        label="Successful"
        value={String(successfulCount).padStart(2, "0")}
        description="Correctly guessed cards"
        icon={<CheckCircle2 size={18} />}
      />

      <StatItem
        label="Failed"
        value={String(failedCount).padStart(2, "0")}
        description="Unsuccessful challenges"
        icon={<XCircle size={18} />}
      />

      <StatItem
        label="Completed"
        value={`${completedCount} / ${GAME_CONFIG.totalCards}`}
        description="Overall game progress"
        icon={<Trophy size={18} />}
      />
    </div>
  );
}

export default GameStats;
