"use client";
import { Plus, Search } from "lucide-react";
import CreateNote from "@/components/CreateNote";
import { useEffect, useState } from "react";
import AvatarDisplay from "@/components/AvatarDisplay";
import NoteCard from "@/components/NoteCard";
import type { Note } from "@/components/NoteCard";

export default function Notes() {
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("access_token");

      const response = await fetch("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setAvatarUrl(data.avatar_url);

      const notesResponse = await fetch("http://127.0.0.1:8000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const noteData = await notesResponse.json();
      setNotes(noteData);
    }

    fetchUser();
  }, []);

  return (
    <div className="w-full bg-background h-full py-5 px-6 flex flex-col">
      <nav className="w-full h-max py-3 flex items-center justify-between">
        <div className="search_bar flex items-center justify-start gap-2 w-[70%] h-12 px-3 border border-primary/50 bg-surface rounded-4xl">
          <span
            className="w-max flex items-center justify-center cursor-pointer p-1"
            title="Search"
          >
            <Search />
          </span>
          <input
            type="text"
            placeholder="Search notes, flashcards..."
            className="w-full outline-0 border-0"
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <button
            className="btn flex items-center justify-center"
            onClick={() => setShowModal(!showModal)}
          >
            Add Note
            <Plus className="inline -translate-y-0.5" />
          </button>
          <AvatarDisplay avatarUrl={avatarUrl} />
        </div>
      </nav>
      <section className="w-full flex-1 h-max px-6 py-8 flex flex-col overflow-hidden relative gap-5">
        <div className="w-full flex items-start justify-center flex-col">
          <h2 className="font-heading text-4xl">Notes</h2>
          <p className="text-muted">
            Organize and process your study materials.
          </p>
        </div>
        <div className="notes_container w-full h-full flex-1 flex flex-wrap items-start justify-start overscroll-none overflow-y-auto py-3 gap-5 relative z-20">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
        <div className="fade"></div>
      </section>
      {showModal && (
        <CreateNote
          showModal={showModal}
          setShowModal={setShowModal}
          onNoteCreated={(newNote: Note) => {
            setNotes((previousNotes) => [...previousNotes, newNote]);
          }}
        />
      )}
    </div>
  );
}
