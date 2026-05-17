import Link from "next/link";
import DailyComponent from "./DailyComponent";

const HeroComponent = () => {
  return (
    <section
      id="homepage"
      className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-32 text-ink md:px-8 md:pt-40"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-inter text-sm font-bold uppercase tracking-[0.24em] text-sage-700">
            MindCere · Brain health companion
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-navy md:text-7xl">
            Gentle brain-health ideas for real life.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-700 md:text-2xl md:leading-10">
            MindCere is a quiet place to read daily tips, reflect on cognitive wellbeing, and learn practical habits for focus, rest, and resilience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#daily-tip"
              className="rounded-full bg-sage-700 px-7 py-4 text-center font-inter font-bold text-cream transition hover:bg-sage-800 focus:outline-none focus:ring-4 focus:ring-sage-200"
            >
              Read today&apos;s tip
            </Link>
            <Link
              href="#about"
              className="rounded-full border border-sage-200 bg-white px-7 py-4 text-center font-inter font-bold text-navy transition hover:border-sage-300 hover:bg-sage-50 focus:outline-none focus:ring-4 focus:ring-sage-100"
            >
              Why I built this
            </Link>
          </div>
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
