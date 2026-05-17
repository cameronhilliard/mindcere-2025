const AboutComponent = () => {
  return (
    <section id="about" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-28 text-maintext lg:flex-row lg:items-center">
      <div className="lg:w-5/12">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-cyan-200">Origin story</p>
        <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">Built from curiosity after a wake-up call.</h2>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-slate-950/30 backdrop-blur lg:w-7/12">
        <p className="text-lg leading-9 text-slate-200">
          MindCere was born from my deep curiosity about brain health, sparked by my own experience with a seizure. That moment led me to explore ways to better understand and protect the brain.
        </p>
        <p className="mt-6 text-lg leading-9 text-slate-300">
          As a developer fascinated by this topic, I created MindCere to uncover insights that could help not only me but others who are looking for ways to support cognitive function. MindCere is not medical advice; it is an invitation to learn, reflect, and build better brain-health habits one day at a time.
        </p>
      </div>
    </section>
  );
};

export default AboutComponent;
