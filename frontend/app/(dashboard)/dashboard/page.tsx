"use client";

import AvatarUpload from "@/components/Avatar";
import { CalendarDaysIcon, Flame, Layers, Notebook, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dailyGenerations, setDailyGenerations] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        setUsername(data.username);
        setUserEmail(data.email);
        setDailyGenerations(data.daily_generations);
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUser();
  }, [router]);

  return (
    <div className="w-full bg-surface min-h-screen p-4 sm:p-6 flex items-center justify-start flex-col gap-6">
      {/* Header Section */}
      <div className="w-full flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 px-1 py-2">
        <h2 className="font-heading text-2xl sm:text-3xl text-text flex flex-col gap-1">
          Welcome back, {username || "Student"}
          <span className="text-muted text-sm sm:text-base font-normal">
            Ready to pick up where you left off?
          </span>
        </h2>
        <div className="self-end sm:self-auto">
          <AvatarUpload
            currentAvatarUrl={avatarUrl}
            onAvatarChange={setAvatarUrl}
          />
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Notes */}
        <div className="border w-full min-h-36 rounded-xl p-4 bg-primary/5 border-primary/50 flex flex-col justify-between gap-3">
          <div className="w-full flex items-center justify-between">
            <Notebook className="text-primary" />
            <span className="text-primary text-xs font-semibold bg-primary/20 rounded-2xl px-2.5 py-1">
              +2 today
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted text-sm">Total Notes</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-text">
              24
            </span>
          </div>
        </div>

        {/* Flashcards */}
        <div className="border w-full min-h-36 rounded-xl p-4 bg-primary/5 border-primary/50 flex flex-col justify-between gap-3">
          <div className="w-full flex items-center justify-between">
            <Layers className="text-primary" />
            <span className="text-primary text-xs font-semibold bg-primary/20 rounded-2xl px-2.5 py-1">
              12 due
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted text-sm">Flashcards</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-text">
              142
            </span>
          </div>
        </div>

        {/* Daily Generations */}
        <div className="border w-full min-h-36 rounded-xl p-4 bg-primary/5 border-primary/50 flex flex-col justify-between gap-3">
          <div className="w-full flex items-center justify-between">
            <Zap className="text-primary" />
            <span className="text-primary text-xs font-semibold bg-primary/20 rounded-2xl px-2.5 py-1">
              Daily limit
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted text-sm">Daily Generations</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-text">
              {dailyGenerations}/10
            </span>
            <div className="w-full max-w-25 h-2 my-1 border border-primary/30 rounded-2xl overflow-hidden">
              <span
                className="block h-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.min((dailyGenerations / 10) * 100, 100)}%`,
                }}
              ></span>
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="border w-full min-h-36 rounded-xl p-4 bg-primary/5 border-primary/50 flex flex-col justify-between gap-3">
          <div className="w-full flex items-center justify-between">
            <Flame className="text-primary" />
            <span className="text-primary bg-primary/20 rounded-2xl p-1">
              <CalendarDaysIcon size={16} />
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted text-sm">Study Streak</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-text">
              5 days
            </span>
          </div>
        </div>
      </div>

      {/* Recent Notes Section */}
      <div className="w-full flex flex-col mt-4 gap-4 px-1">
        <h2 className="font-heading text-xl sm:text-2xl text-text">
          Recent Notes
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="note border border-primary/50 rounded-xl bg-surface w-full h-56 p-5 flex flex-col justify-between cursor-pointer hover:border-primary transition-colors">
            <div className="w-full flex flex-col gap-2">
              <h3 className="font-heading text-xl font-bold line-clamp-2 text-text hover:text-primary transition-colors">
                Cellular Respiration Details
              </h3>
              <p className="text-muted text-sm line-clamp-4">
                Overview of glycolysis, Krebs cycle, and electron transport
                chain. Key enzymes and ATP yield calculations for eukaryotic
                cells.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
