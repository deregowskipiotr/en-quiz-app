
import { Layers3, Sparkles } from "lucide-react";

interface HeaderProps {
  roundNumber: number;
}

function Header({ roundNumber }: HeaderProps) {
  return (
    <header className="mb-10 sm:mb-14">
      <div className="flex items-center gap-2 text-accent mb-4">
        <Sparkles size={16} />

        <span className="text-xs uppercase">
          English Learning Challenge
        </span>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-accent text-4xl sm:text-5xl lg:text-6xl">
            Forbidden Words
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-text/55 max-w-lg">
            Think fast. Describe creatively. Avoid the obvious.
          </p>
        </div>

        <div className="glass-panel rounded-md px-4 py-3 flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-accent/15 text-accent">
            <Layers3 size={18} />
          </span>

          <div>
            <p className="text-[10px] text-text/50">
              CURRENT ROUND
            </p>

            <p className="text-sm font-medium">
              Round {String(roundNumber).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
