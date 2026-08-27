"use client";

import {
  FileStack,
  Layers,
  LayoutDashboard,
  LogOut,
  Notebook,
  Plus,
  Settings,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-primary/50 bg-surface z-30">
        <Link className="flex items-center gap-2" href="/">
          <img src="studyforge-logo.svg" alt="icon logo" className="w-8 h-8" />
          <span className="text-primary text-xl font-heading font-bold">
            StudyForge
          </span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-muted hover:text-primary p-2 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 z-50 left-0 h-screen bg-surface border-r border-primary/50 py-7 flex items-start justify-start flex-col gap-10 z-50 transition-all duration-300
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between w-full gap-2 px-4">
          <div
            className={`flex items-start justify-center flex-col px-2 ${isCollapsed ? "md:hidden" : "block"}`}
          >
            <Link
              className="flex items-center gap-2"
              href="/"
              onClick={() => setIsMobileOpen(false)}
            >
              <img src="studyforge-logo.svg" alt="icon logo" />
              <span className="text-primary text-2xl font-heading font-bold">
                StudyForge
              </span>
            </Link>
            <span className="text-muted pl-3 text-xs">AI Study Assistant</span>
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block hover:text-primary cursor-pointer text-muted ml-auto"
            aria-label="Toggle collapse"
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden hover:text-primary cursor-pointer text-muted ml-auto"
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="font-heading w-full flex items-start justify-center flex-col gap-4 overflow-y-auto mb-36">
          <Link
            href="/dashboard"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${pathname === "/dashboard" ? "active" : ""}`}
            title="Dashboard"
          >
            <LayoutDashboard className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              Dashboard
            </span>
          </Link>

          <Link
            href="/notes"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${pathname === "/notes" ? "active" : ""}`}
            title="My Notes"
          >
            <Notebook className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              My Notes
            </span>
          </Link>

          <Link
            href="/flashcards"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${
              pathname === "/flashcards" ? "active" : ""
            }`}
            title="Flashcards"
          >
            <Layers className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              Flashcards
            </span>
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${
              pathname === "/study-sets" ? "active" : ""
            }`}
            title="Study Sets"
          >
            <FileStack className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              Study Sets
            </span>
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${pathname === "/ai-helper" ? "active" : ""}`}
            title="AI Helper"
          >
            <Sparkles className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              AI Helper
            </span>
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className={`menu_item w-full flex items-center gap-3 px-6 py-2 ${pathname === "/settings" ? "active" : ""}`}
            title="Settings"
          >
            <Settings className="inline shrink-0" />
            <span className={isCollapsed ? "md:hidden" : "block"}>
              Settings
            </span>
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="absolute left-0 bottom-0 w-full h-35 border-t border-primary/50 flex items-center justify-center flex-col gap-5 bg-surface py-4">
          <button
            className="btn flex items-center justify-center gap-2 w-[90%] py-2"
            title="Add Note"
          >
            <span className={isCollapsed ? "md:hidden" : "inline"}>
              Add Note
            </span>
            <Plus className="inline -translate-y-0.5 shrink-0" />
          </button>

          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className="text-muted hover:text-primary flex items-center gap-2 font-bold font-heading"
            title="Logout"
          >
            <LogOut className="inline shrink-0" size={17} />
            <span className={isCollapsed ? "md:hidden" : "block"}>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-[calc(100vh-57px)] md:h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
