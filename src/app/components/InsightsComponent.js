"use client"

import { useEffect, useState } from "react";
import { fetchJsonWithTimeout, isLiveApiEnabled } from "../lib/api";
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
  const [isLoading, setIsLoading] = useState(isLiveApiEnabled());

  useEffect(() => {
    if (!isLiveApiEnabled()) {
      setIsLoading(false);
      setSource("offline");
      setInsights(fallbackInsights);
      return;
    }

    let isMounted = true;

    const fetchInsights = async () => {
      setIsLoading(true);

      try {
        const data = await fetchJsonWithTimeout("/api/random-insights");
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Insights response did not include any items");
        }

        if (!isMounted) {
          return;
        }

        setInsights(data);
        setSource("live");
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch insights:", error);
          setSource("error");
          setInsights(fallbackInsights);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
import InfoComponent from "./InfoComponent";

const fallbackInsights = [
  {
    insights_id: "sleep",
    prompt: "Sleep is your brain's overnight maintenance window.",
    response:
      "Consistent sleep timing supports memory consolidation, emotional regulation, and next-day focus. Treat bedtime like a recurring meeting with tomorrow's mind.",
  },
  {
    insights_id: "movement",
    prompt: "Movement can change the texture of attention.",
    response:
      "A brisk walk, gentle mobility, or light strength work can increase alertness and give anxious thoughts a productive place to go.",
  },
  {
    insights_id: "reflection",
    prompt: "Reflection turns information into self-knowledge.",
    response:
      "Capture one sentence about your energy, mood, and focus each day. Patterns become easier to notice when they are visible.",
  },
];

const InsightsComponent = () => {
  const [insights, setInsights] = useState(fallbackInsights);
  const [source, setSource] = useState("curated");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      return;
    }

    const fetchInsights = async () => {
      try {
        const response = await fetch(`https://${API_URL}/api/random-insights`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setInsights(data);
          setSource("live");
        }
      } catch (error) {
        console.error("Failed to fetch insights:", error);
        setSource("curated");
      }
    };

    fetchInsights();

    return () => {
      isMounted = false;
    };
  }, []);
  }, [API_URL]);

  const sourceMessage = {
    live: "Live insights loaded from the MindCere API.",
    offline: "Live API calls are intentionally off while hosting and MongoDB are paused, so these saved reflections keep the app useful.",
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
    <section id="insights" className="relative mx-auto flex flex-col items-center px-6 py-28 text-maintext">
      <div className="mb-10 max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-cyan-200">
          {source === "live" ? "Live intelligence" : "Curated intelligence"}
        </p>
        <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">Insight cards for the modern mind</h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          A rotating collection of brain-health ideas, translated into practical cues you can test in real life.
        </p>
      </div>

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-3">
        {insights.map((insight, index) => (
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
