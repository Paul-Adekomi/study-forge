"use client";
import { Plus, Search } from "lucide-react";
import CreateNote from "@/components/CreateNote";
import { useEffect, useState } from "react";
import AvatarDisplay from "@/components/AvatarDisplay";
import NoteCard from "@/components/NoteCard";
import type { Note } from "@/components/NoteCard";
import NotePage from "@/components/NotePage";

export default function Notes() {
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  function handleNoteUpdated(updatedNote: Note) {
    setNotes((currentNotes) =>
      currentNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
    );

    setSelectedNote(updatedNote);
  }

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch("http://127.0.0.1:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        }

        const notesResponse = await fetch("http://127.0.0.1:8000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const noteData = await notesResponse.json();

        if (Array.isArray(noteData)) {
          setNotes(noteData);
        } else {
          setNotes([]);
        }
      } catch (err) {
        console.error("Failed to fetch user data or notes", err);
      }
    }

    fetchUser();
  }, []);

  async function handleDeleteNote(noteId: number) {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`http://127.0.0.1:8000/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Failed to delete note");
        return;
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteId),
      );
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="w-full bg-background min-h-screen py-4 sm:py-5 px-4 sm:px-6 flex flex-col relative">
      {/* Top Navbar */}
      <nav className="w-full py-2 sm:py-3 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <div className="search_bar flex items-center justify-start gap-2 w-full md:w-[60%] lg:w-[70%] h-11 sm:h-12 px-3 border border-primary/50 bg-surface rounded-full">
          <span
            className="w-max flex items-center justify-center cursor-pointer p-1 text-muted hover:text-primary"
            title="Search"
          >
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search notes, flashcards..."
            className="w-full outline-none border-0 bg-transparent text-sm sm:text-base text-text placeholder:text-muted"
          />
        </div>
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-6">
          <button
            className="btn flex items-center justify-center gap-1.5 px-4 py-2 text-sm sm:text-base"
            onClick={() => setShowModal(!showModal)}
          >
            <span>Add Note</span>
            <Plus className="inline -translate-y-0.5" size={18} />
          </button>
          <AvatarDisplay avatarUrl={avatarUrl} />
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="w-full flex-1 px-1 sm:px-6 py-4 sm:py-8 flex flex-col relative gap-4 sm:gap-5">
        <div className="w-full flex items-start justify-center flex-col gap-1">
          <h2 className="font-heading text-2xl sm:text-4xl text-text">Notes</h2>
          <p className="text-muted text-sm sm:text-base">
            Organize and process your study materials.
          </p>
        </div>

        {/* Notes Grid Container */}
        <div className="notes_container w-full flex-1 py-3 relative z-20">
          {notes.length === 0 ? (
            <div className="w-full min-h-[40vh] flex flex-col items-center justify-center text-center p-4">
              <p className="text-muted mb-4 text-sm sm:text-base">
                You don't have any notes yet.
              </p>

              <button
                className="btn flex items-center justify-center gap-2"
                onClick={() => setShowModal(true)}
              >
                Add a new note
                <Plus className="inline" size={18} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onSelect={setSelectedNote}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals & Overlays */}
      {showModal && (
        <CreateNote
          showModal={showModal}
          setShowModal={setShowModal}
          onNoteCreated={(newNote: Note) => {
            setNotes((previousNotes) => [...previousNotes, newNote]);
          }}
        />
      )}
      {selectedNote && (
        <NotePage
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onNoteUpdated={handleNoteUpdated}
        />
      )}
    </div>
  );
}
