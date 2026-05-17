import Link from "next/link";
import DailyComponent from "./DailyComponent";

const HeroComponent = () => {
  return (
    <section
      id="homepage"
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pb-24 pt-28 text-maintext md:pt-36"
    >
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-96 w-96 translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-20 left-0 h-80 w-80 -translate-x-1/3 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-100 backdrop-blur">
          Brain health, reframed
        </p>
        <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
          Turn cognitive care into a daily ritual.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-2xl md:leading-10">
          MindCere blends AI-generated education, reflective prompts, and simple routines into a calmer dashboard for learning how your brain thrives.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#insights"
            className="rounded-full bg-cyan-300 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-200"
          >
            Explore insights
          </Link>
          <Link
            href="#about"
            className="rounded-full border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
          >
            Read the story
          </Link>
        </div>

        <DailyComponent />
      </div>
    </section>
  );
};

export default HeroComponent;
