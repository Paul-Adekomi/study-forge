import { Pencil, Sparkles, X } from "lucide-react";
import { Note } from "./NoteCard";
import EditNote from "./EditNote";
import { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);

  function handleGenerateFlashcards() {}
  return (
    <div className="w-full absolute left-0 top-0 h-full bg-surface z-50 px-8 py-10 flex flex-col items-start justify-center gap-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-6xl font-heading">{note.title}</h1>
        <div
          className="w-max h-max flex
     items-center justify-center gap-10"
        >
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
      <div className="w-full h-[10%] flex items-center justify-end">
        <button className="btn" onClick={handleGenerateFlashcards}>
          <Sparkles className="inline" size={16} /> Generate Flashcards
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
