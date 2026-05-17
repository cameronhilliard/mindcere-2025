"use client";

import { useMemo, useState } from "react";
import { BoltIcon, MoonIcon, SparklesIcon, SunIcon } from "@heroicons/react/24/outline";

const moods = [
  { label: "Scattered", icon: BoltIcon, plan: "lower the noise and pick one visible next step" },
  { label: "Tired", icon: MoonIcon, plan: "protect energy with a shorter, softer work block" },
  { label: "Steady", icon: SunIcon, plan: "turn your momentum into a focused rhythm" },
];

const goals = ["Deep work", "Study", "Reset", "Plan my day"];

const rituals = {
  Scattered: {
    headline: "Anchor your attention before you accelerate.",
    steps: ["Clear your surface for 30 seconds.", "Write one task as a verb.", "Set a 12-minute timer and stop when it rings."],
  },
  Tired: {
    headline: "Use a softer pace so focus still feels possible.",
    steps: ["Drink water and dim one distraction.", "Choose the smallest useful version of the task.", "Work for 8 minutes, then take a real pause."],
  },
  Steady: {
    headline: "Convert steadiness into a clean focus loop.",
    steps: ["Name the outcome before opening new tabs.", "Work for 25 minutes with one checkpoint halfway.", "End by noting what made focus easier."],
  },
};

const FocusAIComponent = () => {
  const [selectedMood, setSelectedMood] = useState(moods[0].label);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);

  const response = useMemo(() => {
    const ritual = rituals[selectedMood];

    return {
      ...ritual,
      summary: `For ${selectedGoal.toLowerCase()}, MindCere would ${moods.find((mood) => mood.label === selectedMood).plan}.`,
    };
  }, [selectedGoal, selectedMood]);

  return (
    <section id="focus-ai" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-moss-dark p-6 text-sand shadow-2xl shadow-moss/20 md:p-8">
            <p className="font-inter text-sm font-black uppercase tracking-[0.28em] text-pond">Usable AI concept</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] md:text-5xl">
              A focus coach people can actually use.
            </h2>
            <p className="mt-5 text-lg leading-8 text-sand/78">
              Instead of a generic chatbot, Focus AI acts like a practical reset guide. People choose how they feel and what they need, then receive a short plan they can start immediately.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {moods.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedMood(label)}
                  className={`rounded-3xl border px-4 py-4 text-left transition focus:outline-none focus:ring-4 focus:ring-pond/30 ${
                    selectedMood === label
                      ? "border-pond bg-pond text-moss-dark"
                      : "border-white/10 bg-white/8 text-sand hover:bg-white/12"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="mt-3 block font-inter text-sm font-black uppercase tracking-[0.16em]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="noise-surface focus-card rounded-[2rem] border border-white/70 p-5 backdrop-blur md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-inter text-sm font-black uppercase tracking-[0.24em] text-clay">MindCere Focus AI</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-moss-dark md:text-4xl">Build my next ritual</h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-black text-moss-dark">
                <SparklesIcon className="h-5 w-5" />
                Prototype
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  className={`rounded-full px-4 py-2 font-inter text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-moss/15 ${
                    selectedGoal === goal ? "bg-moss text-sand" : "bg-white/80 text-stone hover:bg-white"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-moss/10 bg-white/78 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-moss text-sm font-black text-sand">AI</span>
                <div>
                  <p className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">Generated plan</p>
                  <p className="font-bold text-moss-dark">{response.summary}</p>
                </div>
              </div>

              <h4 className="mt-6 text-2xl font-black tracking-[-0.03em] text-moss-dark">{response.headline}</h4>
              <ol className="mt-5 grid gap-3">
                {response.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-2xl bg-sand px-4 py-3 text-stone">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-sm font-black text-white">{index + 1}</span>
                    <span className="font-semibold leading-7">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-5 text-sm font-semibold leading-6 text-stone">
              This is educational support, not medical advice. It is designed to help users choose a calm next action and reflect on patterns over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAIComponent;
