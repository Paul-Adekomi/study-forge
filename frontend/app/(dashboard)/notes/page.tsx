"use client";
import { EllipsisVertical, Layers, Plus, Search } from "lucide-react";
import Image from "next/image";
import Avatar from "@/assets/image/default_Avatar.png";
import CreateNote from "@/components/CreateNote";
import { useState } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

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
          <div className="w-12 h-12 border-2 border-primary rounded-full overflow-hidden">
            <Image src={Avatar} alt="avatar" className="w-fit h-fit" />
          </div>
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
          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 2h ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>24 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Modern European History
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Causes and consequences of the French Revolution. Impact on
                  neighboring monarchies and the rise of Napoleon Bonaparte.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited yesterday</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>52 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Advanced Calculus: Integration Techniques
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Integration by parts, partial fractions, and trigonometric
                  substitution. Includes practice problems and step-by-step
                  solutions for final exam review.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 3 days ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>Generate Flashcards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Introduction to Psychology
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Freudian theories vs. behaviorism. Classical and operant
                  conditioning examples.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 1w ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>18 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 2h ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>24 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 2h ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>24 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 2h ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>24 Cards</span>
              </span>
            </div>
          </div>

          <div className="note border border-primary/50 rounded-xl bg-surface w-70 h-65 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-[85%]">
              <div className="w-full flex items-center justify-between pl-0">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full">
                <p className="text-muted line-clamp-3 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>

            <div className="flex w-full h-[15%] border-t border-primary/50 items-center justify-between pt-2">
              <span className="text-muted text-sm">Edited 2h ago</span>
              <span className="w-max border border-primary/50 rounded-2xl flex items-center justify-center gap-2 px-2 font-heading text-primary text-sm">
                <Layers className="inline" size={16} />
                <span>24 Cards</span>
              </span>
            </div>
          </div>
        </div>
        <div className="fade"></div>
      </section>
      {showModal && (
        <CreateNote showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}
