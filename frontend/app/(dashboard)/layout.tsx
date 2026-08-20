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

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-[20%]"
        } h-screen border-r border-primary/50 py-7 flex items-start justify-start flex-col gap-10 bg-surface relative z-50 transition-all duration-300`}
      >
        <div className="flex items-center justify-between w-full gap-2 px-4">
          {!isCollapsed && (
            <div className="flex items-start justify-center flex-col px-2">
              <Link className="flex items-center gap-2" href="/">
                <img src="studyforge-logo.svg" alt="icon logo" />
                <span className="text-primary text-2xl font-heading font-bold">
                  StudyForge
                </span>
              </Link>
              <span className="text-muted pl-3">AI Study Assistant</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:text-primary cursor-pointer text-muted"
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>

        <div className="font-heading w-full flex items-start justify-center flex-col gap-4">
          <Link
            href="/dashboard"
            className={`menu_item ${pathname === "/dashboard" ? "active" : ""}`}
            title="Dashboard"
          >
            <LayoutDashboard className="inline" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link
            href="/notes"
            className={`menu_item ${pathname === "/notes" ? "active" : ""}`}
            title="My Notes"
          >
            <Notebook className="inline" />
            {!isCollapsed && <span>My Notes</span>}
          </Link>

          <Link
            href="/"
            className={`menu_item ${
              pathname === "/flashcards" ? "active" : ""
            }`}
            title="Flashcards"
          >
            <Layers className="inline" />
            {!isCollapsed && <span>Flashcards</span>}
          </Link>

          <Link
            href="/"
            className={`menu_item ${
              pathname === "/study-sets" ? "active" : ""
            }`}
            title="Study Sets"
          >
            <FileStack className="inline" />
            {!isCollapsed && <span>Study Sets</span>}
          </Link>

          <Link
            href="/"
            className={`menu_item ${pathname === "/ai-helper" ? "active" : ""}`}
            title="AI Helper"
          >
            <Sparkles className="inline" />
            {!isCollapsed && <span>AI Helper</span>}
          </Link>

          <Link
            href="/"
            className={`menu_item ${pathname === "/settings" ? "active" : ""}`}
            title="Settings"
          >
            <Settings className="inline" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </div>

        <div className="absolute left-0 bottom-0 w-full h-35 border-t border-primary/50 flex items-center justify-center flex-col gap-5">
          <button
            className="btn flex items-center justify-center w-[90%]"
            title="Add Note"
          >
            {!isCollapsed && "Add Note"}
            <Plus className="inline -translate-y-0.5" />
          </button>

          <Link
            href="/"
            className="text-muted hover:text-primary flex items-center gap-2 font-bold font-heading"
            title="Logout"
          >
            <LogOut className="inline" size={17} />
            {!isCollapsed && "Logout"}
          </Link>
        </div>
      </aside>

      <main
        className={`${isCollapsed ? "w-[calc(100%-5rem)]" : "w-[80%]"} relative h-screen transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}
