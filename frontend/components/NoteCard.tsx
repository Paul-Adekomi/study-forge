import { EllipsisVertical, Layers, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type Note = {
  id: number;
  title: string;
  content: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

type NoteCardProps = {
  note: Note;
  onDelete: (noteId: number) => void;
  onSelect: (note: Note) => void;
};

export default function NoteCard({ note, onDelete, onSelect }: NoteCardProps) {
  const [visibility, setVisibility] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNoteMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setVisibility((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisibility(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  function formatDate(date?: string) {
    if (!date) return "No date";

    const noteDate = new Date(date.endsWith("Z") ? date : date + "Z");
    const now = new Date();

    const diff = now.getTime() - noteDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `Edited ${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Edited yesterday";
    if (days < 7) return `Edited ${days}d ago`;

    return `Edited ${noteDate.toLocaleDateString()}`;
  }

  return (
    <div className="note group border border-primary/50 rounded-xl bg-surface w-full h-auto min-h-[15rem] p-4 sm:p-5 flex flex-col justify-between cursor-pointer hover:border-primary/90 transition-colors relative">
      {/* Main Card Content */}
      <div
        className="w-full flex-1 flex flex-col gap-2 mb-3"
        onClick={() => onSelect(note)}
      >
        <div className="w-full flex items-start justify-between gap-2">
          <h3 className="font-heading text-xl sm:text-2xl font-bold line-clamp-2 text-text group-hover:text-primary transition-colors">
            {note.title}
          </h3>
          <button
            onClick={handleNoteMenu}
            onTouchStart={handleNoteMenu}
            className="p-1 -mr-1 rounded-md text-muted hover:text-primary focus:outline-none shrink-0"
            aria-label="Note options"
          >
            <EllipsisVertical size={22} className="pointer-events-none" />
          </button>
        </div>
        <div className="w-full">
          <p className="text-muted text-sm line-clamp-3 leading-relaxed">
            {note.content}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex w-full border-t border-primary/30 items-center justify-between pt-3 mt-auto">
        <span className="text-muted text-xs sm:text-sm truncate">
          {formatDate(note.updated_at)}
        </span>
        <span className="w-max border border-primary/50 rounded-full flex items-center justify-center gap-1.5 px-2.5 py-1 font-heading text-primary text-xs sm:text-sm hover:bg-primary/10 transition-colors">
          <Layers size={14} className="shrink-0" />
          <span>Cards</span>
        </span>
      </div>

      {/* Action Dropdown Menu */}
      {visibility && (
        <div
          className="noteMenu absolute w-32 right-3 top-10 bg-background border border-primary/50 flex flex-col rounded-lg font-heading z-30 shadow-lg py-1"
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full px-3 py-2 text-xs sm:text-sm flex items-center justify-between text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            <span>Delete</span>
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
