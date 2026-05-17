"use client"

import { useEffect, useState } from "react";
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
  }, [API_URL]);

  return (
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
