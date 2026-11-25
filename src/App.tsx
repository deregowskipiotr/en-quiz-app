
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GameOverview from "./components/game/GameOverview";
import GameGrid from "./components/game/GameGrid";
import GameControls from "./components/game/GameControls";
import GameComplete from "./components/game/GameComplete";
import { useGame } from "./hooks/useGame";
import { GAME_CONFIG } from "./data/gameConfig";
import { Shuffle, RotateCcw } from "lucide-react";

function App() {
  const {
    questions,
    cardProgress,
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
  } = useGame();

  return (
    <main className="min-h-screen bg-main text-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Header */}
        <Header roundNumber={1} />

        {/* Statistics */}
        <GameOverview
          successfulCount={successfulCount}
          failedCount={failedCount}
          completedCount={completedCount}
        />

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
              {String(questions.length - completedCount).padStart(2, "0")} CARDS REMAINING
            </span>
          </div>

          <GameGrid
            questions={questions}
            cardProgress={cardProgress}
            activeCardId={activeCardId}
            openCard={openCard}
          />
        </section>

        {/* Active Game Controls */}
        {gameStatus === "playing" && progress && (
          <section className="mb-10">
            <GameControls
              timeRemaining={progress.timeRemaining}
              mistakes={progress.mistakes}
              maxMistakes={GAME_CONFIG.maxMistakes}
              onCorrectAnswer={registerCorrectAnswer}
              onMistake={registerMistake}
              onForbiddenWord={registerForbiddenWord}
            />
          </section>
        )}

        {/* Round Complete */}
        {gameStatus === "complete" && (
          <section className="mb-10">
            <GameComplete
              successfulCount={successfulCount}
              failedCount={failedCount}
              onReset={resetGame}
            />
          </section>
        )}

        {/* Game Controls */}
        {gameStatus === "playing" && (
          <section className="glass-panel rounded-md p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-accent text-xl">
                  Round Settings
                </h3>

                <p className="mt-1 text-xs text-text/45">
                  Shuffle cards or restart the current round.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={shuffleCards}
                  disabled={Boolean(activeCardId)}
                  className="flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-text transition-colors duration-500 ease-linear hover:bg-accent/20 hover:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Shuffle size={16} className="text-accent" />
                  Shuffle
                </button>

                <button
                  type="button"
                  onClick={resetGame}
                  className="flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-text transition-colors duration-500 ease-linear hover:bg-accent/20 hover:border-accent"
                >
                  <RotateCcw size={16} className="text-accent" />
                  Reset
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />

      </div>
    </main>
  );
}

export default App;
