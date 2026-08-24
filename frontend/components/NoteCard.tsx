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

  const handleNoteMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibility(!visibility);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisibility(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <div className="note group border border-primary/50 rounded-xl bg-surface w-75 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90 relative">
      <div
        className="w-full flex flex-col gap-2 h-[85%]"
        onClick={() => onSelect(note)}
      >
        <div className="w-full flex items-center justify-between pl-0">
          <h3 className="font-heading text-2xl truncate line-clamp-2 text-wrap w-full group-hover:text-primary ">
            {note.title}
          </h3>
          <span onClick={handleNoteMenu}>
            <EllipsisVertical
              size={35}
              className="text-muted w-max self-start pt-2 font-bold group-hover:text-primary"
            />
          </span>
        </div>
        <div className="w-full">
          <p className="text-muted line-clamp-3 w-full text-wrap">
            {note.content}
          </p>
        </div>
      </div>

      <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
        <span className="text-muted text-sm">
          {formatDate(note.updated_at)}
        </span>
        <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 py-1.5 font-heading text-primary text-sm">
          <Layers className="inline" size={16} />
          <span>Generate Cards</span>
        </span>
      </div>

      {visibility && (
        <div
          className="noteMenu absolute w-28 h-max top-0 right-0 z- bg-background translate-x-6 translate-y-15 border border-primary/50 flex items-center justify-center flex-col rounded-md font-heading z-20 pb-3"
          style={{ boxShadow: "0px 2px 10px 0px #ffffff35" }}
          ref={menuRef}
        >
          <button
            className="w-full px-2 py-1 text-center cursor-pointer hover:bg-red-500 hover:text-background"
            onClick={() => onDelete(note.id)}
          >
            Delete <Trash2 size={16} className="inline" />
          </button>
        </div>
      )}
    </div>
  );
}
