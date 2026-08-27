import { NotebookPen, Save, X } from "lucide-react";
import { useState } from "react";
import { Note } from "./NoteCard";

type EditNoteProps = {
  note: Note;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onNoteUpdated: (updatedNote: Note) => void;
};

export default function EditNote({
  note,
  showModal,
  setShowModal,
  onNoteUpdated,
}: EditNoteProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving] = useState(false);

  async function handleUpdateNote() {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const token = localStorage.getItem("access_token");
    setSaving(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      onNoteUpdated(data);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to update note", err);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-[95%] sm:w-[85%] md:w-[60%] lg:w-[50%] bg-surface border border-primary/50 h-auto max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-primary/50 px-4 sm:px-5 py-3 flex items-center justify-between shrink-0">
          <span className="flex items-center justify-center gap-2">
            <NotebookPen className="inline text-primary shrink-0" size={20} />
            <span className="text-lg sm:text-xl font-heading font-semibold text-text">
              Edit Note
            </span>
          </span>
          <button
            onClick={() => setShowModal(!showModal)}
            className="text-muted hover:text-primary cursor-pointer p-1"
            title="Close"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="w-full flex-1 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Title Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="font-heading text-xs sm:text-sm text-muted uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              className="w-full h-11 sm:h-12 border border-primary/50 outline-none rounded-md px-3 bg-background text-text text-sm sm:text-base focus:border-primary transition-colors"
              placeholder="e.g., Cellular Respiration Summary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content Textarea */}
          <div className="w-full flex-1 flex flex-col gap-1.5 min-h-40">
            <label className="font-heading text-xs sm:text-sm text-muted uppercase tracking-wider">
              Note Content
            </label>
            <textarea
              className="w-full flex-1 border border-primary/50 bg-background outline-none rounded-md p-3 resize-none text-text text-sm sm:text-base focus:border-primary transition-colors min-h-35"
              placeholder="Start typing your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-primary/20 px-4 sm:px-5 py-3 flex items-center justify-between shrink-0 bg-surface">
          <button
            className="bg-surface border border-primary/50 px-4 py-2 text-primary cursor-pointer rounded-md text-sm sm:text-base duration-100 font-heading hover:bg-primary hover:text-background"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary px-5 py-2 text-background cursor-pointer rounded-md transition-all duration-100 font-heading text-sm sm:text-base flex items-center gap-1.5 hover:bg-primary-hover disabled:opacity-50"
            onClick={handleUpdateNote}
            disabled={saving || !title.trim() || !content.trim()}
          >
            <Save size={16} className="inline -translate-y-0.5" />
            <span>{saving ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
