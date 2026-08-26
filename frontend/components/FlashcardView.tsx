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
      <div className="w-full h-full absolute left-0 top-0 bg-background z-50 flex flex-col items-center justify-center gap-4 p-8 text-center">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-8 text-muted hover:text-primary cursor-pointer"
          >
            <X size={24} />
          </button>
        )}
        <p className="text-muted text-lg">No flashcards available.</p>
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
    <div className="w-full h-full absolute left-0 top-0 bg-background z-50 flex items-center justify-center flex-col gap-5">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-muted hover:text-primary cursor-pointer"
        >
          <X size={24} />
        </button>
      )}

      <div>
        <h2 className="text-center">
          Flashcard {currentIndex + 1}/{totalCards}
        </h2>
        <div className="w-40 h-1 bg-primary/40 my-1 rounded-2xl overflow-hidden">
          <span
            className="block h-full bg-primary"
            style={{ width: `${progressPercent}%` }}
          ></span>
        </div>
      </div>

      <div
        className="flashcard bg-primary/20 w-[60%] h-[50%] rounded-3xl border-primary border-2 overflow-hidden cursor-pointer"
        onClick={() => setRevealed(!revealed)}
      >
        <div
          className={`w-full h-[200%] flex flex-col transition-transform duration-500 ease-in-out ${
            revealed ? "-translate-y-1/2" : "translate-y-0"
          }`}
        >
          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-10 text-center gap-2">
            <h2 className="font-heading text-4xl font-bold">
              {currentCard?.question}
            </h2>
            <span className="text-muted text-sm">
              Tap card to reveal answer
            </span>
          </div>

          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-10 text-center gap-2">
            <span className="text-muted text-sm">Answer</span>
            <h2 className="font-heading text-4xl font-bold">
              {currentCard?.answer}
            </h2>
          </div>
        </div>
      </div>

      <button className="btn" onClick={() => setRevealed(!revealed)}>
        <FlipHorizontal className="inline mx-1" size={16} />
        {revealed ? "Hide Answer" : "Reveal Answer"}
      </button>

      <div className="w-max h-max flex items-center justify-center gap-10">
        <button
          className="w-max h-max p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="text-primary group-hover:text-background" />
        </button>
        <span className="flex items-center gap-2 text-text">
          <Keyboard className="inline" size={16} />
          <span>Use arrows to navigate</span>
        </span>
        <button
          className="w-max h-max p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={currentIndex >= totalCards - 1}
        >
          <ChevronRight className="text-primary group-hover:text-background" />
        </button>
      </div>
    </div>
  );
}
