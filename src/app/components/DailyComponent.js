"use client";

import { useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { fetchJsonWithTimeout, isLiveApiEnabled } from "../lib/api";

const fallbackTip = {
  title: "Begin with a quiet threshold",
  content:
    "Before your first demanding task, put both feet on the floor, take four slow breaths, and write the smallest next action. A clear beginning makes focus easier to return to.",
  dailytip: "Today’s calm reset",
};

const DailyComponent = () => {
  const [tip, setTip] = useState(fallbackTip);
  const [status, setStatus] = useState("offline");
  const [isLoading, setIsLoading] = useState(isLiveApiEnabled());

  useEffect(() => {
    if (!isLiveApiEnabled()) {
      setStatus("offline");
      setTip(fallbackTip);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchTip = async () => {
      setIsLoading(true);

      try {
        const data = await fetchJsonWithTimeout("/mc_tips");

        if (!isMounted) {
          return;
        }

        setTip({
          title: data?.title || fallbackTip.title,
          content: data?.content || fallbackTip.content,
          dailytip: data?.dailytip || fallbackTip.dailytip,
        });
        setStatus("live");
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch daily tip:", error);
          setStatus("error");
          setTip(fallbackTip);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTip();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusMessage = {
    live: "Live guidance loaded from the MindCere feed.",
    offline: "Curated mode is active while the live API is unavailable.",
    error: "Using a saved reset because the live feed did not respond.",
  }[status];

  return (
    <article
      id="daily-tip"
      className="focus-card relative mt-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-5 text-left backdrop-blur md:mt-0 md:p-7"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-pond/60 blur-3xl" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-moss px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-sand">
            <SparklesIcon className="h-4 w-4" />
            Daily reset
          </span>
          <span className="rounded-full border border-moss/10 bg-sand px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-stone">
            {isLoading ? "Loading" : status === "live" ? "Live" : "Saved"}
          </span>
        </div>

        {isLoading ? (
          <div className="mt-7 space-y-4" aria-live="polite" aria-busy="true">
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-mint" />
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-mint" />
            <div className="space-y-3 pt-2">
              <div className="h-4 animate-pulse rounded-full bg-mint" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-mint" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-mint" />
            </div>
          </div>
        ) : (
          <div className="mt-7">
            <p className="font-inter text-sm font-black uppercase tracking-[0.2em] text-clay">{tip.dailytip}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-moss-dark md:text-4xl">
              {tip.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone">{tip.content}</p>
            <p className="mt-6 rounded-2xl bg-mint/70 px-4 py-3 text-sm font-semibold leading-6 text-moss-dark" role={status === "error" ? "status" : undefined}>
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default DailyComponent;
