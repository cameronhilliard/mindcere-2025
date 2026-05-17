const AboutComponent = () => {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 text-ink md:px-8">
      <div className="grid gap-12 rounded-[2rem] border border-sage-100 bg-white p-8 shadow-[0_24px_80px_rgba(29,53,87,0.07)] md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-inter text-sm font-bold uppercase tracking-[0.24em] text-sage-700">
            About
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] text-navy md:text-5xl">
            Built after a personal wake-up call.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-9 text-slate-700">
          <p>
            MindCere began with my own curiosity about brain health after experiencing a seizure. That moment made the topic feel less abstract and much more personal.
          </p>
          <p>
            I am not building MindCere as medical advice. I am building it as a thoughtful place to collect practical ideas, reflect on cognitive wellbeing, and encourage steady habits that support a healthier life.
          </p>
          <p className="rounded-3xl bg-cream p-5 text-base leading-7 text-slate-600">
            If you have medical questions, symptoms, or concerns, please talk with a qualified clinician. MindCere is here to support learning and reflection, not diagnosis or treatment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
