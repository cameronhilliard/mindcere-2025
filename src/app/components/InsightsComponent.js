"use client"

import { useEffect, useState } from "react";
import InfoComponent from "./InfoComponent";

const fallbackInsights = [
  {
    insights_id: "sleep",
    prompt: "Protect sleep like a recovery practice.",
    response:
      "A consistent wind-down rhythm can make memory, mood, and attention feel less fragile the next day. Start by making bedtime predictable, not perfect.",
  },
  {
    insights_id: "movement",
    prompt: "Use movement to change mental weather.",
    response:
      "A walk, stretch, or light strength session can help attention settle because the body gives restless thoughts somewhere practical to go.",
  },
  {
    insights_id: "reflection",
    prompt: "Track patterns without judging them.",
    response:
      "One sentence about energy, focus, sleep, or stress can reveal useful patterns over time. Reflection works best when it feels gentle enough to repeat.",
  },
];

const InsightsComponent = () => {
  const [insights, setInsights] = useState(fallbackInsights);
  const [source, setSource] = useState("offline");
  const [isLoading, setIsLoading] = useState(Boolean(process.env.NEXT_PUBLIC_API_URL));
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setIsLoading(false);
      setSource("offline");
      return;
    }

    const controller = new AbortController();

    const fetchInsights = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`https://${API_URL}/api/random-insights`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Insights request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Insights response did not include any items");
        }

        setInsights(data);
        setSource("live");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch insights:", error);
          setSource("error");
          setInsights(fallbackInsights);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();

    return () => controller.abort();
  }, [API_URL]);

  const sourceMessage = {
    live: "Live insights loaded from the MindCere API.",
    offline: "The hosted API and MongoDB cluster are paused, so these saved reflections keep the app useful.",
    error: "The live feed could not be reached, so MindCere is showing saved reflections.",
  }[source];

  return (
    <section id="insights" className="mx-auto max-w-6xl px-6 py-24 text-ink md:px-8">
      <div className="max-w-3xl">
        <p className="font-inter text-sm font-bold uppercase tracking-[0.24em] text-sage-700">
          Insights
        </p>
        <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] text-navy md:text-6xl">
          Small ideas you can actually carry into the day.
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          MindCere keeps the guidance simple: learn one thing, notice one pattern, and try one habit without turning health into another source of pressure.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-sage-100 bg-sage-50 px-5 py-4 text-sm leading-6 text-slate-700" role={source === "error" ? "status" : undefined}>
        {isLoading ? "Checking for live insights..." : sourceMessage}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-[1.5rem] border border-sage-100 bg-white p-7">
                <div className="h-10 w-10 animate-pulse rounded-full bg-sage-100" />
                <div className="mt-8 h-6 animate-pulse rounded-full bg-sage-100" />
                <div className="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-sage-100" />
                <div className="mt-6 space-y-3">
                  <div className="h-4 animate-pulse rounded-full bg-sage-100" />
                  <div className="h-4 w-5/6 animate-pulse rounded-full bg-sage-100" />
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
    </section>
  );
};

export default InsightsComponent;
