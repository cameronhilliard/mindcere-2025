"use client";

import { useEffect, useState } from "react";
import { fetchJsonWithTimeout, isLiveApiEnabled } from "../lib/api";
import InfoComponent from "./InfoComponent";

const fallbackInsights = [
  {
    insights_id: "attention-anchors",
    prompt: "What makes focus feel less fragile?",
    response:
      "Stable cues help. A named task, a visible timer, and a short closing note can make it easier to return when attention drifts.",
  },
  {
    insights_id: "rest-is-input",
    prompt: "Why does rest belong in a focus system?",
    response:
      "Your brain needs recovery to consolidate, regulate, and adapt. Planned pauses protect consistency better than pushing until you crash.",
  },
  {
    insights_id: "reduce-friction",
    prompt: "How can people start when motivation is low?",
    response:
      "Shrink the entry point. Two minutes of setup, one sentence of planning, or one page of reading can turn avoidance into motion.",
  },
];

const InsightsComponent = () => {
  const [insights, setInsights] = useState(fallbackInsights);
  const [source, setSource] = useState("offline");
  const [isLoading, setIsLoading] = useState(isLiveApiEnabled());

  useEffect(() => {
    if (!isLiveApiEnabled()) {
      setInsights(fallbackInsights);
      setSource("offline");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchInsights = async () => {
      setIsLoading(true);

      try {
        const data = await fetchJsonWithTimeout("/mc_insights");
        const nextInsights = Array.isArray(data) && data.length > 0 ? data : fallbackInsights;

        if (!isMounted) {
          return;
        }

        setInsights(nextInsights);
        setSource("live");
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch insights:", error);
          setInsights(fallbackInsights);
          setSource("error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInsights();

    return () => {
      isMounted = false;
    };
  }, []);

  const sourceMessage = {
    live: "Live insight cards loaded from the MindCere feed.",
    offline: "Curated cards are shown while the live API is turned off.",
    error: "Saved cards are shown because the live feed did not respond.",
  }[source];

  return (
    <section id="insights" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-inter text-sm font-black uppercase tracking-[0.28em] text-clay">
              {source === "live" ? "Live insight library" : "Curated insight library"}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-moss-dark md:text-5xl">
              Brain-health ideas translated into everyday moves.
            </h2>
          </div>
          <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-bold leading-6 text-stone md:max-w-xs" role={source === "error" ? "status" : undefined}>
            {isLoading ? "Checking for live insights..." : sourceMessage}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.75rem] border border-white/70 bg-white/55 p-7">
                  <div className="h-12 w-12 animate-pulse rounded-2xl bg-mint" />
                  <div className="mt-8 h-7 animate-pulse rounded-full bg-mint" />
                  <div className="mt-4 h-7 w-3/4 animate-pulse rounded-full bg-mint" />
                  <div className="mt-6 space-y-3">
                    <div className="h-4 animate-pulse rounded-full bg-mint" />
                    <div className="h-4 w-5/6 animate-pulse rounded-full bg-mint" />
                  </div>
                </div>
              ))
            : insights.map((insight, index) => (
                <InfoComponent
                  key={`${insight.insights_id || insight.prompt}-${index}`}
                  index={index}
                  prompts={insight.prompt}
                  response={insight.response}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsComponent;
