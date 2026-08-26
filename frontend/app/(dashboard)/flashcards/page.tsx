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

      // Otherwise fetch all flashcards from backend API (menu navigation)
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
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted">Loading flashcards...</p>
      </div>
    );
  }

  return (
    <FlashcardView flashcards={flashcards} onClose={() => router.back()} />
  );
}
