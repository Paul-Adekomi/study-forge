import { EllipsisVertical, Layers } from "lucide-react";

export type Note = {
  id: number;
  title: string;
  content: string;
  owner_id: number;
  created_at: string;
};

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="note group border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
      <div className="w-full flex flex-col gap-2 h-[85%]">
        <div className="w-full flex items-center justify-between pl-0">
          <h3 className="font-heading text-2xl truncate line-clamp-2 text-wrap w-full group-hover:text-primary ">
            {note.title}
          </h3>
          <EllipsisVertical
            size={35}
            className="text-muted w-max self-start pt-2 font-bold group-hover:text-primary"
          />
        </div>
        <div className="w-full">
          <p className="text-muted line-clamp-3 w-full text-wrap">
            {note.content}
          </p>
        </div>
      </div>

      <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
        <span className="text-muted text-sm">{note.created_at}</span>
        <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
          <Layers className="inline" size={16} />
          <span>Generate Cards</span>
        </span>
      </div>
    </div>
  );
}
