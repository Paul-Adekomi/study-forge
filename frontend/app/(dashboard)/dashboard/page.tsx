"use client";

import Avatar from "@/assets/image/default_Avatar.png";
import {
  CalendarDaysIcon,
  EllipsisVertical,
  Flame,
  Layers,
  Notebook,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dailyGenerations, setDailyGenerations] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }
    async function fetchUser() {
      const response = await fetch("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setUsername(data.username);
      setUserEmail(data.email);
      setDailyGenerations(data.daily_generations);
    }

    fetchUser();
  }, [router]);

  return (
    <div className="w-full bg-surface h-full p-6 flex items-center justify-start flex-col">
      <div className="w-full h-20 flex items-center justify-between px-3 py-2">
        <h2 className="font-heading text-3xl text-text flex flex-col">
          Welcome back, {username}
          <span className="text-muted text-base">
            Ready to pick up where you left off?{" "}
          </span>
        </h2>
        <div className="w-12 h-12 border-2 border-primary rounded-full overflow-hidden">
          <Image src={Avatar} alt="avatar" className="w-fit h-fit" />
        </div>
      </div>

      <div className="w-full h-50 flex items-center justify-between px-5 gap-5">
        <div className="border w-60 h-40 rounded-xl p-4 bg-primary/5 border-primary/50 flex items-center justify-center flex-col gap-5">
          <div className="w-full flex items-center justify-between">
            <Notebook className="text-primary inline" />
            <span className="text-primary bg-primary/20 rounded-2xl px-2 py-1">
              +2 today
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted">Total Notes</span>
            <span className="font-heading text-3xl font-bold text-text">
              24
            </span>
          </div>
        </div>

        <div className="border w-60 h-40 rounded-xl p-4 bg-primary/5 border-primary/50 flex items-center justify-center flex-col gap-5">
          <div className="w-full flex items-center justify-between">
            <Layers className="text-primary inline" />
            <span className="text-primary bg-primary/20 rounded-2xl px-2 py-1">
              12 due
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted">Flashcards</span>
            <span className="font-heading text-3xl font-bold text-text">
              142
            </span>
          </div>
        </div>

        <div className="border w-60 h-40 rounded-xl p-4 bg-primary/5 border-primary/50 flex items-center justify-center flex-col gap-5">
          <div className="w-full flex items-center justify-between">
            <Zap className="text-primary inline" />
            <span className="text-primary bg-primary/20 rounded-2xl px-2 py-1">
              Daily limit
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted">Daily Generations</span>
            <span className="font-heading text-3xl font-bold text-text">
              {dailyGenerations}/10
            </span>
            <span className="w-25 h-2 my-1 border border-primary/30 rounded-2xl overflow-hidden">
              <span
                className="block h-full bg-primary"
                style={{ width: `${(dailyGenerations / 10) * 100}%` }}
              ></span>
            </span>
          </div>
        </div>

        <div className="border w-60 h-40 rounded-xl p-4 bg-primary/5 border-primary/50 flex items-center justify-center flex-col gap-5">
          <div className="w-full flex items-center justify-between">
            <Flame className="text-primary inline" />
            <span className="text-primary bg-primary/20 rounded-2xl px-2 py-1">
              <CalendarDaysIcon />
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-muted">Study Streak</span>
            <span className="font-heading text-3xl font-bold text-text">
              5 days
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-50 flex flex-col mt-10 items-start justify-evenly px-3">
        <h2 className="font-heading text-2xl">Recent Notes</h2>
        <div className="w-full h-max flex items-center justify-start mt-5 px-5 gap-5 flex-wrap">
          <div className="note border border-primary/50 rounded-xl bg-surface w-60 h-60 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-full">
              <div className="w-full flex items-center justify-between ">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full h-full">
                <p className="text-muted line-clamp-4 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>
          </div>
          <div className="note border border-primary/50 rounded-xl bg-surface w-60 h-60 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-full">
              <div className="w-full flex items-center justify-between ">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full h-full">
                <p className="text-muted line-clamp-4 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>
          </div>
          <div className="note border border-primary/50 rounded-xl bg-surface w-60 h-60 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-full">
              <div className="w-full flex items-center justify-between ">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full h-full">
                <p className="text-muted line-clamp-4 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>
          </div>
          <div className="note border border-primary/50 rounded-xl bg-surface w-60 h-60 px-5 py-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary/90">
            <div className="w-full flex flex-col gap-2 h-full">
              <div className="w-full flex items-center justify-between ">
                <h3 className="font-heading text-4xl truncate line-clamp-2 text-wrap w-full hover:text-primary ">
                  Cellular Respiration Details
                </h3>
                <EllipsisVertical
                  size={35}
                  className="text-muted w-max self-start pt-2 font-bold"
                />
              </div>
              <div className="w-full h-full">
                <p className="text-muted line-clamp-4 w-full text-wrap">
                  Overview of glycolysis, Krebs cycle, and electron transport
                  chain. Key enzymes and ATP yield calculations for eukaryotic
                  cells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
