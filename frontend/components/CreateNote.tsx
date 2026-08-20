import { NotebookPen, Sparkles, X } from "lucide-react";

export default function CreateNote({ showModal, setShowModal }: any) {
  return (
    <div className="w-full h-full z-40 absolute left-0 top-0 bg-surface/10 backdrop-blur-xs flex items-center justify-center">
      <div className="w-[50%] bg-surface border border-primary/50 h-[65%] rounded-2xl overflow-hidden">
        <div className="border-b border-primary/50 h-[10%] px-5 py-2 flex items-center justify-between">
          <span className="flex items-center justify-center gap-2">
            <NotebookPen className="inline text-primary" />
            <span className="text-xl font-heading">Create New Note</span>
          </span>
          <button
            onClick={() => setShowModal(!showModal)}
            className="Shover:text-primary cursor-pointer"
            title="Close"
          >
            <X />
          </button>
        </div>

        <div className="w-full h-[80%] p-6 gap-5">
          <div className="w-full h-[20%] flex items-start justify-center flex-col gap-1">
            <span className="font-heading text-muted">TITLE</span>
            <input
              type="text"
              className="w-full h-32 border border-primary/50 outline-0 rounded-md px-3 bg-background"
              placeholder="e.g, Cellular Respiration Summary"
            />
          </div>
          <div className="w-full h-[80%] flex items-start justify-center flex-col gap-1 pt-5">
            <span className="font-heading text-muted">NOTE CONTENT</span>
            <textarea
              className="w-full h-[80%] border border-primary/50 bg-background outline-0 rounded-md p-3 resize-none"
              placeholder="Start typing your notes here..."
            ></textarea>
          </div>
        </div>

        <div className="h-[10%] px-5 pb-2 flex items-center justify-between">
          <button className="bg-surface border border-primary/50 px-5 py-1.5 text-primary cursor-pointer rounded-md duration-100 font-heading inline-block hover:bg-primary hover:text-background">
            Cancel
          </button>
          <button className="bg-primary px-5 py-1.5 text-background cursor-pointer rounded-md transition-all duration-100 font-heading inline-block hover:bg-primary-hover">
            <Sparkles size={15} className="inline" /> Save & Generate
          </button>
        </div>
      </div>
    </div>
  );
}
