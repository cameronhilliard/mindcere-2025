"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BoltIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  MoonIcon,
  PauseIcon,
  PlayIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const STORAGE_KEY = "mindcere-focus-sessions";

const moods = [
  {
    label: "Scattered",
    icon: BoltIcon,
    plan: "lower the noise and pick one visible next step",
    headline: "Anchor your attention before you accelerate.",
    warmup: "Clear your surface, silence one distraction, and write the task as a verb.",
  },
  {
    label: "Tired",
    icon: MoonIcon,
    plan: "protect energy with a shorter, softer work block",
    headline: "Use a softer pace so focus still feels possible.",
    warmup: "Drink water, lower the brightness, and choose the smallest useful version of the work.",
  },
  {
    label: "Steady",
    icon: SunIcon,
    plan: "turn your momentum into a focused rhythm",
    headline: "Convert steadiness into a clean focus loop.",
    warmup: "Name the outcome, close extra tabs, and decide what finished will look like.",
  },
];

const goals = ["Deep work", "Study", "Reset", "Plan my day"];
const durations = [8, 12, 25];

const goalSteps = {
  "Deep work": "Work on the single hardest part before checking messages.",
  Study: "Teach the idea back in one sentence after the timer ends.",
  Reset: "Do one grounding action, then decide what can wait.",
  "Plan my day": "Choose the top three tasks and put the first one on your calendar.",
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const readSavedSessions = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to read saved focus sessions:", error);
    return [];
  }
};

const FocusAIComponent = () => {
  const [selectedMood, setSelectedMood] = useState(moods[0].label);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [duration, setDuration] = useState(durations[1]);
  const [task, setTask] = useState("Draft the next important section");
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [journal, setJournal] = useState("");
  const [savedSessions, setSavedSessions] = useState([]);
  const [copyStatus, setCopyStatus] = useState("Copy plan");

  const selectedMoodData = useMemo(
    () => moods.find((mood) => mood.label === selectedMood) || moods[0],
    [selectedMood],
  );

  const response = useMemo(() => {
    const cleanTask = task.trim() || "your next useful task";
    const reflectionPrompt =
      selectedMood === "Tired"
        ? "Afterward, write one sentence about what gave you energy back."
        : "Afterward, write one sentence about what made attention easier.";

    return {
      summary: `For ${selectedGoal.toLowerCase()}, MindCere will ${selectedMoodData.plan}.`,
      headline: selectedMoodData.headline,
      steps: [
        selectedMoodData.warmup,
        `Spend ${duration} minutes on: ${cleanTask}.`,
        goalSteps[selectedGoal],
        reflectionPrompt,
      ],
    };
  }, [duration, selectedGoal, selectedMood, selectedMoodData, task]);

  const planText = useMemo(
    () => [`${response.headline}`, response.summary, ...response.steps.map((step, index) => `${index + 1}. ${step}`)].join("\n"),
    [response],
  );

  useEffect(() => {
    setSavedSessions(readSavedSessions());
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setSecondsLeft(duration * 60);
    setIsRunning(false);
  }, [duration, selectedGoal, selectedMood, task]);

  useEffect(() => {
    setCheckedSteps([]);
  }, [response.headline]);

  const toggleStep = (step) => {
    setCheckedSteps((currentSteps) =>
      currentSteps.includes(step) ? currentSteps.filter((savedStep) => savedStep !== step) : [...currentSteps, step],
    );
  };

  const handleCopyPlan = async () => {
    if (!navigator.clipboard) {
      setCopyStatus("Copy unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(planText);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy plan"), 1800);
    } catch (error) {
      console.error("Failed to copy focus plan:", error);
      setCopyStatus("Copy failed");
    }
  };

  const saveSession = () => {
    const nextSession = {
      id: crypto.randomUUID(),
      goal: selectedGoal,
      mood: selectedMood,
      task: task.trim() || "Untitled focus session",
      duration,
      journal: journal.trim() || "No reflection added yet.",
      completedSteps: checkedSteps.length,
      createdAt: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }),
    };
    const nextSessions = [nextSession, ...savedSessions].slice(0, 3);

    setSavedSessions(nextSessions);
    setJournal("");

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSessions));
    } catch (error) {
      console.error("Failed to save focus session:", error);
    }
  };

  return (
    <section id="focus-ai" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[2rem] bg-moss-dark p-6 text-sand shadow-2xl shadow-moss/20 md:p-8">
            <p className="font-inter text-sm font-black uppercase tracking-[0.28em] text-pond">Working prototype</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] md:text-5xl">
              A focus coach people can actually use.
            </h2>
            <p className="mt-5 text-lg leading-8 text-sand/78">
              Choose your state, define the work, start a timer, check off the plan, and save a short reflection. No backend is required for this prototype.
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
                  aria-pressed={selectedMood === label}
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
                Live demo
              </span>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <label htmlFor="focus-task" className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">
                  What do you want to work on?
                </label>
                <textarea
                  id="focus-task"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-none rounded-2xl border border-moss/10 bg-sand px-4 py-3 font-semibold leading-7 text-moss-dark outline-none transition placeholder:text-stone/70 focus:border-moss focus:ring-4 focus:ring-moss/10"
                  placeholder="Example: review biology notes for chapter 4"
                />
              </div>

              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <p className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">Session length</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {durations.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDuration(option)}
                      className={`rounded-2xl px-3 py-3 font-inter text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-moss/15 ${
                        duration === option ? "bg-moss text-sand" : "bg-sand text-stone hover:bg-white"
                      }`}
                      aria-pressed={duration === option}
                    >
                      {option}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  className={`rounded-full px-4 py-2 font-inter text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-moss/15 ${
                    selectedGoal === goal ? "bg-moss text-sand" : "bg-white/80 text-stone hover:bg-white"
                  }`}
                  aria-pressed={selectedGoal === goal}
                >
                  {goal}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[1.5rem] border border-moss/10 bg-moss-dark p-5 text-sand md:p-6">
                <p className="font-inter text-xs font-black uppercase tracking-[0.22em] text-pond">Focus timer</p>
                <p className="mt-4 text-6xl font-black tracking-[-0.06em]" aria-live="polite">
                  {formatTime(secondsLeft)}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRunning((currentValue) => !currentValue)}
                    className="inline-flex items-center gap-2 rounded-full bg-pond px-5 py-3 font-inter text-sm font-black text-moss-dark transition hover:bg-mint focus:outline-none focus:ring-4 focus:ring-pond/30"
                  >
                    {isRunning ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                    {isRunning ? "Pause" : "Start"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSecondsLeft(duration * 60);
                      setIsRunning(false);
                    }}
                    className="rounded-full border border-white/15 px-5 py-3 font-inter text-sm font-black text-sand transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-pond/20"
                  >
                    Reset
                  </button>
                </div>
                <p className="mt-5 text-sm font-semibold leading-6 text-sand/70">
                  This timer runs in the browser and resets whenever you change the plan.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-moss/10 bg-white/78 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-moss text-sm font-black text-sand">AI</span>
                  <div>
                    <p className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">Generated plan</p>
                    <p className="font-bold text-moss-dark">{response.summary}</p>
                  </div>
                </div>

                <h4 className="mt-6 text-2xl font-black tracking-[-0.03em] text-moss-dark">{response.headline}</h4>
                <ol className="mt-5 grid gap-3">
                  {response.steps.map((step, index) => {
                    const isChecked = checkedSteps.includes(step);

                    return (
                      <li key={step}>
                        <button
                          type="button"
                          onClick={() => toggleStep(step)}
                          className={`flex w-full gap-3 rounded-2xl px-4 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-moss/15 ${
                            isChecked ? "bg-mint text-moss-dark" : "bg-sand text-stone hover:bg-white"
                          }`}
                          aria-pressed={isChecked}
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-sm font-black text-white">
                            {isChecked ? <CheckCircleIcon className="h-5 w-5" /> : index + 1}
                          </span>
                          <span className="font-semibold leading-7">{step}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <button
                  type="button"
                  onClick={handleCopyPlan}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-moss/10 bg-white px-4 py-2 font-inter text-sm font-black text-moss-dark transition hover:bg-mint focus:outline-none focus:ring-4 focus:ring-moss/15"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {copyStatus}
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <label htmlFor="focus-reflection" className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">
                  Reflection
                </label>
                <textarea
                  id="focus-reflection"
                  value={journal}
                  onChange={(event) => setJournal(event.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-none rounded-2xl border border-moss/10 bg-sand px-4 py-3 font-semibold leading-7 text-moss-dark outline-none transition placeholder:text-stone/70 focus:border-moss focus:ring-4 focus:ring-moss/10"
                  placeholder="What helped your focus? What should change next time?"
                />
                <button
                  type="button"
                  onClick={saveSession}
                  className="mt-3 rounded-full bg-moss px-5 py-3 font-inter text-sm font-black text-sand transition hover:bg-moss-dark focus:outline-none focus:ring-4 focus:ring-moss/20"
                >
                  Save session
                </button>
              </div>

              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <p className="font-inter text-xs font-black uppercase tracking-[0.18em] text-stone">Recent sessions</p>
                <div className="mt-3 grid gap-3" aria-live="polite">
                  {savedSessions.length === 0 ? (
                    <p className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold leading-6 text-stone">
                      Save a session to see your recent focus history here.
                    </p>
                  ) : (
                    savedSessions.map((session) => (
                      <article key={session.id} className="rounded-2xl bg-sand px-4 py-3">
                        <p className="text-sm font-black text-moss-dark">{session.task}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-stone">
                          {session.duration}m · {session.mood} · {session.goal}
                        </p>
                        <p className="mt-2 text-xs font-bold text-stone">
                          {session.completedSteps} steps checked · {session.createdAt}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-stone">{session.journal}</p>
                      </article>
                    ))
                  )}
                </div>
              </div>
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
