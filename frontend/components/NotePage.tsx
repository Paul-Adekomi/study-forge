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
    <div className="w-full absolute left-0 top-0 h-full bg-surface z-50 px-8 py-10 flex flex-col items-start justify-center gap-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-6xl font-heading">{note.title}</h1>
        <div className="w-max h-max flex items-center justify-center gap-10">
          <button className="btn" onClick={() => setShowModal(!showModal)}>
            Edit Note <Pencil className="inline" size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="content w-full h-[80%] overflow-hidden overflow-y-auto py-3 px-6">
        {note.content}
      </div>

      <div className="w-full h-[10%] flex flex-col items-end gap-2">
        {generateError && (
          <p className="text-red-500 text-sm">{generateError}</p>
        )}
        <button
          className="btn"
          onClick={handleGenerateFlashcards}
          disabled={isGenerating}
        >
          <Sparkles className="inline" size={16} />
          {isGenerating ? "Generating..." : "Generate flashcards"}
        </button>
      </div>

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
