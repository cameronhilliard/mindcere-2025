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
        </div>

        <DailyComponent />
      </div>
    </section>
  );
};

export default HeroComponent;
