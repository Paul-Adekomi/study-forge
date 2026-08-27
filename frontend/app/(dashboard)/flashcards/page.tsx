"use client";

import { useEffect, useState } from "react";
import FlashcardView, { Flashcard } from "@/components/FlashcardView";
import { useRouter } from "next/navigation";

export default function FlashcardsPage() {
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashcards() {
      const cached = localStorage.getItem("generated_flashcards");
      if (cached) {
        setFlashcards(JSON.parse(cached));
        localStorage.removeItem("generated_flashcards");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("http://127.0.0.1:8000/flashcards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFlashcards(data.flashcards ?? data ?? []);
        }
      } catch (err) {
        console.error("Failed to load flashcards", err);
      } finally {
        setLoading(false);
      }
    }

    loadFlashcards();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] sm:min-h-screen flex items-center justify-center p-4">
        <p className="text-muted text-sm sm:text-base animate-pulse">
          Loading flashcards...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-57px)] md:min-h-screen p-4 sm:p-6 flex flex-col items-center justify-center touch-pan-y overflow-x-hidden">
      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
        <FlashcardView flashcards={flashcards} onClose={() => router.back()} />
      </div>
    </div>
  );
}
