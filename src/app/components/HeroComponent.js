import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import DailyComponent from "./DailyComponent";

const signals = ["90-second reset", "Focus ritual", "Reflection prompt"];

const HeroComponent = () => {
  return (
    <section id="homepage" className="relative px-4 pb-20 pt-32 sm:px-6 md:pt-40 lg:pb-28">
      <div className="absolute left-[-6rem] top-28 h-72 w-72 rounded-full bg-pond/50 blur-3xl" />
      <div className="absolute right-[-9rem] top-48 h-96 w-96 rounded-full bg-clay/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="inline-flex rounded-full border border-moss/10 bg-white/55 px-4 py-2 font-inter text-xs font-black uppercase tracking-[0.28em] text-moss backdrop-blur">
            Calm focus in a cabin-like workspace
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-moss-dark sm:text-6xl md:text-7xl">
            Meet the AI companion that helps your brain settle, choose, and begin.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone sm:text-xl sm:leading-9">
            MindCere now feels like a quiet forest studio: practical brain-health education, reflective prompts, and a usable focus AI that builds simple plans without adding pressure.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#focus-ai"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-moss px-7 py-4 font-inter font-black text-sand shadow-xl shadow-moss/20 transition hover:-translate-y-1 hover:bg-moss-dark focus:outline-none focus:ring-4 focus:ring-moss/20"
            >
              Try Focus AI
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#daily-tip"
              className="inline-flex items-center justify-center rounded-full border border-moss/15 bg-white/65 px-7 py-4 font-inter font-black text-moss-dark backdrop-blur transition hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-4 focus:ring-moss/15"
            >
              Read today’s reset
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm font-bold text-stone sm:flex-row sm:flex-wrap">
            {signals.map((signal) => (
              <span key={signal} className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-moss" />
                {signal}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="noise-surface focus-card rounded-[2rem] border border-white/70 p-5 backdrop-blur md:p-7">
            <div className="rounded-[1.5rem] bg-moss-dark p-5 text-sand shadow-2xl shadow-moss/20">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-mint">Focus room</p>
                <span className="h-3 w-3 rounded-full bg-clay shadow-lg shadow-clay/60" />
              </div>
              <p className="mt-8 text-4xl font-black tracking-[-0.05em] md:text-5xl">12 min</p>
              <p className="mt-3 text-sm leading-6 text-sand/75">A gentle sprint with one clear task, two breath breaks, and a closing note.</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Breathe", "Begin", "Reflect"].map((item) => (
                  <span key={item} className="rounded-2xl bg-white/10 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <DailyComponent />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
