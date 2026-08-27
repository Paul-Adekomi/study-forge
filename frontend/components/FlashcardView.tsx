"use client";

import {
  ChevronLeft,
  ChevronRight,
  FlipHorizontal,
  Keyboard,
  X,
} from "lucide-react";
import { useState } from "react";

export type Flashcard = {
  question: string;
  answer: string;
};

type FlashcardViewProps = {
  flashcards?: Flashcard[];
  onClose?: () => void;
};

export default function FlashcardView({
  flashcards = [],
  onClose,
}: FlashcardViewProps) {
  const [revealed, setRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeFlashcards = flashcards ?? [];

  if (!safeFlashcards || safeFlashcards.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-screen bg-background z-50 flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 text-muted hover:text-primary cursor-pointer p-2"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        )}
        <p className="text-muted text-base sm:text-lg">
          No flashcards available.
        </p>
      </div>
    );
  }

  const currentCard = safeFlashcards[currentIndex];
  const totalCards = safeFlashcards.length;
  const progressPercent = ((currentIndex + 1) / totalCards) * 100;

  function handleNext() {
    setRevealed(false);
    setCurrentIndex((prev) => Math.min(prev + 1, totalCards - 1));
  }

  function handlePrevious() {
    setRevealed(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="fixed inset-0 w-full h-screen bg-background z-50 flex items-center justify-between flex-col py-6 px-4 sm:px-8 gap-4 overflow-y-auto">
      {/* Top Header & Close Button */}
      <div className="w-full flex items-center justify-between relative pt-2">
        <div className="flex flex-col items-center justify-center mx-auto">
          <h2 className="text-center font-heading text-base sm:text-lg text-text">
            Flashcard {currentIndex + 1}/{totalCards}
          </h2>
          <div className="w-32 sm:w-40 h-1.5 bg-primary/30 my-1.5 rounded-full overflow-hidden">
            <span
              className="block h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:right-4 text-muted hover:text-primary cursor-pointer p-1"
            aria-label="Close viewer"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Main Interactive Flashcard */}
      <div
        className="flashcard bg-primary/20 w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%] h-[45vh] sm:h-[50vh] min-h-[260px] rounded-2xl sm:rounded-3xl border-primary border-2 overflow-hidden cursor-pointer shadow-lg transition-all"
        onClick={() => setRevealed(!revealed)}
      >
        <div
          className={`w-full h-[200%] flex flex-col transition-transform duration-500 ease-in-out ${
            revealed ? "-translate-y-1/2" : "translate-y-0"
          }`}
        >
          {/* Card Front (Question) */}
          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-6 sm:p-10 text-center gap-3 overflow-y-auto">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
              {currentCard?.question}
            </h2>
            <span className="text-muted text-xs sm:text-sm">
              Tap card to reveal answer
            </span>
          </div>

          {/* Card Back (Answer) */}
          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-6 sm:p-10 text-center gap-3 overflow-y-auto">
            <span className="text-muted text-xs sm:text-sm uppercase tracking-wider font-semibold">
              Answer
            </span>
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
              {currentCard?.answer}
            </h2>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <button
        className="btn flex items-center justify-center gap-2 px-5 py-2.5 text-sm sm:text-base font-heading"
        onClick={() => setRevealed(!revealed)}
      >
        <FlipHorizontal size={18} />
        <span>{revealed ? "Hide Answer" : "Reveal Answer"}</span>
      </button>

      {/* Bottom Navigation Controls */}
      <div className="w-full flex items-center justify-center gap-6 sm:gap-10 pb-4">
        <button
          className="p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          <ChevronLeft className="text-primary group-hover:text-background transition-colors" />
        </button>

        <span className="hidden sm:flex items-center gap-2 text-muted text-xs sm:text-sm">
          <Keyboard size={16} />
          <span>Use arrows to navigate</span>
        </span>

        <button
          className="p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          onClick={handleNext}
          disabled={currentIndex >= totalCards - 1}
          aria-label="Next card"
        >
          <ChevronRight className="text-primary group-hover:text-background transition-colors" />
        </button>
      </div>
    </div>
  );
}
