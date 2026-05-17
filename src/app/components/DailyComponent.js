"use client"

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";

const fallbackTip = {
  title: "Build a calmer cognitive rhythm",
  content:
    "Take ninety seconds to breathe slowly, sip water, and name the next tiny action you can complete. Small resets help your attention feel less scattered.",
  dailytip: "Today's Mind Reset",
};

const DailyComponent = () => {
  const [tip, setTip] = useState(fallbackTip);
  const [status, setStatus] = useState("curated");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      return;
    }

    const fetchTip = async () => {
      try {
        const response = await fetch(`https://${API_URL}/mc_tips`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setTip({
          title: data.title || fallbackTip.title,
          content: data.content || fallbackTip.content,
          dailytip: data.dailytip || fallbackTip.dailytip,
        });
        setStatus("live");
      } catch (error) {
        console.error("Failed to fetch daily tip:", error);
        setStatus("curated");
      }
    };

    fetchTip();
  }, [API_URL]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-left shadow-2xl shadow-cyan-950/40 backdrop-blur md:p-8"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100">
            Daily Neuro-Spark
          </span>
          <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            {status === "live" ? "Live feed" : "Curated"}
          </span>
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100/80">
          {tip.dailytip}
        </p>
        <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
          {tip.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-200">{tip.content}</p>
      </div>
    </motion.article>
  );
};

export default DailyComponent;
