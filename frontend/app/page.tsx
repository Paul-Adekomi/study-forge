import NavBar from "@/components/NavBar";
import { ArrowRight, Brain, FileStack, ScanText } from "lucide-react";
import Link from "next/link";

export default function page() {
  const date = new Date();
  const year = date.getUTCFullYear();
  return (
    <>
      <NavBar />
      {/* Header/ Hero section */}
      <header className="w-full h-200 flex items-center justify-center flex-col pt-20 bg-background">
        <div className="md:w-[50%] w-full h-max flex items-center justify-center flex-col gap-5 md:p-0 px-5">
          <h1 className="md:text-7xl text-6xl font-heading font-bold md:text-left text-center">
            Turn your notes into <br className="md:block hidden" />
            flashcards,
            <span className="relative inline-block text-primary">
              instantly.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 40"
                fill="none"
                stroke="#F5A623"
                strokeWidth="2"
                strokeLinecap="round"
                className="absolute left-0 -translate-y-1"
              >
                <path d="M 2 2 Q 50 10 98 2" />
              </svg>
            </span>
          </h1>
          <p className="text-center text-muted md:p-0 px-5">
            Upload your lecture notes, PDFs, or docs, and our AI will
            automatically generate optimized flashcard decks designed for active
            recall. Stop formatting, start studying.
          </p>
          <Link href="/login" className="btn">
            Start Learning for Free{" "}
            <ArrowRight size={16} className="inline pointer-events-none" />
          </Link>
        </div>
      </header>
      {/* Features & How It Works Section */}
      <section className="bg-background md:250 h-700 md:h-400 flex items-center justify-center gap-50 flex-col md:px-0 px-5">
        {/* Features */}
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="flex items-center justify-center flex-col text-center">
            <h2 className="font-heading text-3xl font-bold">
              Built for deep focus.
            </h2>
            <p className="text-muted">
              Everything you need to master your material, without the clutter.
            </p>
          </div>
          {/* Card container */}
          <div className="card_container w-full flex items-center justify-evenly flex-col md:flex-row flex-wrap md:gap-0 gap-6">
            <div className="card">
              <span>
                <ScanText size={24} />
              </span>
              <h3 className="text-2xl font-heading">AI Extraction</h3>
              <p className="text-muted">
                Instantly parse complex documents, highlighting key concepts and
                definitions automatically.
              </p>
            </div>

            <div className="card">
              <span>
                <Brain size={24} />
              </span>
              <h3 className="text-2xl font-heading">Smart Review</h3>
              <p className="text-muted">
                Spaced repetition algorithms adapt to your learning speed,
                showing cards just before you forget them.
              </p>
            </div>

            <div className="card">
              <span>
                <FileStack size={24} />
              </span>
              <h3 className="text-2xl font-heading">Study Sets</h3>
              <p className="text-muted">
                Organize your subjects into clean, distinct collections. Search,
                filter, and master specific topics.
              </p>
            </div>
          </div>
        </div>
        {/* How it works */}
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="flex items-center justify-center flex-col text-center">
            <h2 className="font-heading text-3xl font-bold">
              How StudyForge works
            </h2>
            <p className="text-muted">
              Three steps from raw notes to retained knowledge.
            </p>
          </div>

          <div className="card_container w-full flex items-center justify-evenly flex-col md:flex-row flex-wrap md:gap-0 gap-6">
            <div className="flex items-center justify-center flex-col gap-2 w-[20rem] text-center">
              <span className="circle">
                <span>1</span>
              </span>
              <h3 className="text-[1.5rem] font-bold font-heading">Upload</h3>
              <p className="text-muted">
                Paste text or upload your PDF lecture slides and study guides.
              </p>
            </div>

            <div className="flex items-center justify-center flex-col gap-2 w-[20rem] text-center">
              <span className="circle">
                <span>2</span>
              </span>
              <h3 className="text-[1.5rem] font-bold font-heading">Generate</h3>
              <p className="text-muted">
                Our AI parses the structure and creates a comprehensive deck of
                Q&A cards.
              </p>
            </div>

            <div className="flex items-center justify-center flex-col gap-2 w-[20rem] text-center">
              <span className="circle">
                <span>3</span>
              </span>
              <h3 className="text-[1.5rem] font-bold font-heading">Study</h3>
              <p className="text-muted">
                Use our distraction-free interface to master the material via
                spaced repetition.
              </p>
            </div>
          </div>

          <Link className="btn" href="/login">
            Create Your First Deck
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-max border-t border-gray-600 px-4 md:px-8 py-4 flex items-center md:justify-between justify-center flex-wrap bg-background z-50">
        <span className="flex items-center gap-2">
          <img
            src="studyforge-logo-footer.svg"
            alt="icon logo"
            className="backdrop-grayscale-100"
          />
          <span className="text-muted text-2xl md:text-3xl font-heading font-bold">
            StudyForge
          </span>
        </span>
        <span className="text-muted font-heading text-center">
          &copy; {year} StudyForge. All rights reserved.
        </span>
      </footer>
    </>
  );
}
