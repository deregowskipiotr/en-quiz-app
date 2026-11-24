import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  RotateCcw,
  Shuffle,
  Layers3,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const INITIAL_CARDS = Array.from({ length: 16 }, (_, index) => index + 1);

interface StatItemProps {
  label: string;
  value: string;
  icon: ReactNode;
  description: string;
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

interface GameCardProps {
  number: number;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}

function GameCard({ number, index, isOpen, onClick }: GameCardProps) {
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
        className="quiz-card"
        onClick={onClick}
        aria-label={`Card ${number}, ${isOpen ? "close" : "open"}`}
        aria-pressed={isOpen}
      >
        <motion.span
          className="quiz-card-inner"
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <span className="quiz-card-face quiz-card-front">
            <span className="absolute top-3 left-3 text-[10px] text-accent/60">
              MYSTERY CARD
            </span>

            <span className="font-accent text-5xl sm:text-6xl text-text">
              {String(number).padStart(2, "0")}
            </span>

            <span className="mt-3 text-[10px] sm:text-xs text-text/45">
              CLICK TO REVEAL
            </span>

            <span className="absolute bottom-3 right-3 text-accent/60">
              <Sparkles size={15} strokeWidth={1.5} />
            </span>
          </span>

          <span className="quiz-card-face quiz-card-back">
            <span className="text-[10px] text-accent mb-3">
              CARD {String(number).padStart(2, "0")}
            </span>

            <span className="font-accent text-xl sm:text-2xl text-text text-center px-2">
              Coming Soon
            </span>

            <span className="mt-3 text-[10px] text-text/50">
              WORD & FORBIDDEN TERMS
            </span>
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}

function App() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleShuffle = () => {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setCards(shuffled);
    setActiveCard(null);
  };

  const handleReset = () => {
    setCards([...INITIAL_CARDS]);
    setActiveCard(null);
  };

  return (
    <main className="min-h-screen bg-main text-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Header */}

        <Header roundNumber={1} />

        {/* Statistics */}

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-accent text-xl sm:text-2xl">
              Game Overview
            </h2>

            <span className="text-xs text-accent/70">
              READY TO PLAY
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatItem
              label="Total Cards"
              value="16"
              description="Available this round"
              icon={<Layers3 size={18} />}
            />

            <StatItem
              label="Time Limit"
              value="90s"
              description="Per active card"
              icon={<Clock3 size={18} />}
            />

            <StatItem
              label="Max Mistakes"
              value="05"
              description="Incorrect guesses allowed"
              icon={<Target size={18} />}
            />

            <StatItem
              label="Completed"
              value="0 / 16"
              description="Your game progress"
              icon={<CheckCircle2 size={18} />}
            />
          </div>
        </section>

        {/* Card Grid */}

        <section className="mb-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
            <div>
              <h2 className="font-accent text-2xl sm:text-3xl">
                Choose Your Card
              </h2>

              <p className="text-xs text-text/45 mt-2">
                Select a number to reveal your challenge.
              </p>
            </div>

            <span className="text-xs text-accent/70">
              {String(cards.length).padStart(2, "0")} CARDS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {cards.map((number, index) => (
              <GameCard
                key={number}
                number={number}
                index={index}
                isOpen={activeCard === number}
                onClick={() =>
                  setActiveCard((current) =>
                    current === number ? null : number
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* Game Controls */}

        <section className="glass-panel rounded-md p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-accent text-xl">
                Game Controls
              </h3>

              <p className="mt-1 text-xs text-text/45">
                Manage your current round.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-text transition-colors duration-500 ease-linear hover:bg-accent/20 hover:border-accent"
              >
                <Shuffle size={16} className="text-accent" />
                Shuffle
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-text transition-colors duration-500 ease-linear hover:bg-accent/20 hover:border-accent"
              >
                <RotateCcw size={16} className="text-accent" />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}

        <Footer />

      </div>
    </main>
  );
}

export default App;
