"use client"

import { useEffect, useState } from "react";
import { fetchJsonWithTimeout, isLiveApiEnabled } from "../lib/api";

const fallbackTip = {
  title: "Start with a softer signal",
  content:
    "Before asking your brain to sprint, give it a small cue: drink water, take three slow breaths, and write down the one task that matters most right now.",
  dailytip: "Today’s gentle reset",
};

const DailyComponent = () => {
  const [tip, setTip] = useState(fallbackTip);
  const [status, setStatus] = useState("offline");
  const [isLoading, setIsLoading] = useState(isLiveApiEnabled());

  useEffect(() => {
    if (!isLiveApiEnabled()) {
      setIsLoading(false);
      setStatus("offline");
      setTip(fallbackTip);
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
          title: data.title || fallbackTip.title,
          content: data.content || fallbackTip.content,
          dailytip: data.dailytip || fallbackTip.dailytip,
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
    live: "Loaded from the MindCere feed.",
    offline: "Offline edition: live API calls are turned off while hosting and MongoDB are paused.",
    error: "Using a saved tip because the live feed is unavailable.",
  }[status];

  return (
    <article
      id="daily-tip"
      className="rounded-[2rem] border border-sage-100 bg-white p-7 shadow-[0_24px_80px_rgba(29,53,87,0.08)] md:p-9"
    >
      <div className="flex flex-col gap-4 border-b border-sage-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-inter text-xs font-bold uppercase tracking-[0.24em] text-sage-700">
            Daily tip
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] text-navy">
            A calmer start
          </h2>
        </div>
        <span className="w-fit rounded-full bg-sky-soft px-4 py-2 font-inter text-xs font-bold uppercase tracking-[0.16em] text-navy">
          {isLoading ? "Loading" : status === "live" ? "Live" : "Saved"}
        </span>
      </div>

      {isLoading ? (
        <div className="mt-7 space-y-4" aria-live="polite" aria-busy="true">
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-sage-100" />
          <div className="h-7 w-3/4 animate-pulse rounded-full bg-sage-100" />
          <div className="space-y-3 pt-2">
            <div className="h-4 animate-pulse rounded-full bg-sage-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-sage-100" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-sage-100" />
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <p className="font-inter text-sm font-bold uppercase tracking-[0.18em] text-sage-700">
            {tip.dailytip}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-navy">
            {tip.title}
          </h3>
          <p className="mt-5 text-lg leading-8 text-slate-700">{tip.content}</p>
          <p className="mt-6 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 text-slate-600" role={status === "error" ? "status" : undefined}>
            {statusMessage}
          </p>
        </div>
      )}
    </article>
  );
};

export default DailyComponent;
