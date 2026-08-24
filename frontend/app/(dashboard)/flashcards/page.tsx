"use client";

import {
  ChevronLeft,
  ChevronRight,
  FlipHorizontal,
  Keyboard,
} from "lucide-react";
import { useState } from "react";

export default function flashcard() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="w-full h-full bg-background flex items-center justify-center flex-col gap-5">
      <div>
        <h2 className="text-center">Flashcard 1/5</h2>
        <div className="w-40 h-1 bg-primary/40 my-1 rounded-2xl overflow-hidden">
          <span className="block h-full w-[40%] bg-primary"></span>
        </div>
      </div>

      <div className="flashcard bg-primary/20 w-[60%] h-[50%] rounded-3xl border-primary border-2 overflow-hidden">
        <div
          className={`w-full h-[200%] flex flex-col transition-transform duration-500 ease-in-out ${
            revealed ? "-translate-y-1/2" : "translate-y-0"
          }`}
        >
          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-10 text-center gap-2">
            <h2 className="font-heading text-4xl font-bold">
              What is the primary function of mitochondria?
            </h2>

            <span className="text-muted text-sm">
              Tap card to reveal answer
            </span>
          </div>

          <div className="w-full h-1/2 shrink-0 flex items-center justify-center flex-col p-10 text-center gap-2">
            <span className="text-muted text-sm">Answer</span>

            <h2 className="font-heading text-4xl font-bold">
              They produce ATP through cellular respiration, providing energy
              for the cell.
            </h2>
          </div>
        </div>
      </div>

      <button className="btn" onClick={() => setRevealed(!revealed)}>
        <FlipHorizontal className="inline mx-1" size={16} />
        {revealed ? "Hide Answer" : "Reveal Answer"}
      </button>
      <div className="w-max h-max flex items-center justify-center gap-10">
        <button className="w-max h-max p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary">
          <ChevronLeft className="text-primary group-hover:text-background" />
        </button>
        <span className="flex items-center gap-2 text-text">
          <Keyboard className="inline" size={16} />
          <span>Use arrows to navigate</span>
        </span>
        <button className="w-max h-max p-3 border border-primary rounded-full cursor-pointer group hover:bg-primary">
          <ChevronRight className="text-primary group-hover:text-background" />
        </button>
      </div>
    </div>
  );
}
