"use client";

import { Pencil, Sparkles, X } from "lucide-react";
import { Note } from "./NoteCard";
import EditNote from "./EditNote";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NotePageProps = {
  note: Note;
  onClose: () => void;
  onNoteUpdated: (updatedNote: Note) => void;
};

export default function NotePage({
  note,
  onClose,
  onNoteUpdated,
}: NotePageProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  async function handleGenerateFlashcards() {
    const token = localStorage.getItem("access_token");
    setIsGenerating(true);
    setGenerateError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notes/${note.id}/generate-flashcards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setGenerateError(
            "Daily generation limit reached. Try again tomorrow",
          );
        } else {
          setGenerateError(data.detail || "Failed to generate flashcards");
        }
        return;
      }

      const cards = data.flashcards ?? [];

      if (cards.length > 0) {
        localStorage.setItem("generated_flashcards", JSON.stringify(cards));

        router.push("/flashcards");
      } else {
        setGenerateError("No flashcards were generated for this note.");
      }
    } catch (err) {
      setGenerateError("Something went wrong!");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="fixed inset-0 w-full h-screen bg-surface z-50 px-4 sm:px-8 py-6 sm:py-10 flex flex-col items-start justify-between gap-4 sm:gap-6 overflow-hidden">
      {/* Header Bar */}
      <div className="w-full flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-primary/20 pb-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-text break-words line-clamp-2 pr-2">
          {note.title}
        </h1>
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
          <button
            className="btn flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
            onClick={() => setShowModal(!showModal)}
          >
            <span>Edit Note</span>
            <Pencil className="inline" size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary cursor-pointer p-1"
            aria-label="Close note"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="content w-full flex-1 overflow-y-auto py-2 px-1 sm:px-3 text-sm sm:text-base text-text leading-relaxed">
        {note.content}
      </div>

      {/* Footer Actions */}
      <div className="w-full pt-4 border-t border-primary/20 flex flex-col items-end gap-2">
        {generateError && (
          <p className="text-red-500 text-xs sm:text-sm text-right">
            {generateError}
          </p>
        )}
        <button
          className="btn flex items-center gap-2 w-full sm:w-auto justify-center px-4 py-2 text-sm sm:text-base"
          onClick={handleGenerateFlashcards}
          disabled={isGenerating}
        >
          <Sparkles className="inline" size={16} />
          <span>{isGenerating ? "Generating..." : "Generate flashcards"}</span>
        </button>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditNote
          note={note}
          showModal={showModal}
          setShowModal={setShowModal}
          onNoteUpdated={(updatedNote) => {
            onNoteUpdated(updatedNote);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
