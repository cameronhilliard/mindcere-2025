const values = [
  "gentle education over overwhelm",
  "small rituals over perfect routines",
  "reflection over self-judgment",
];

const AboutComponent = () => {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-2xl shadow-moss/10 backdrop-blur md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-inter text-sm font-black uppercase tracking-[0.28em] text-clay">Origin story</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-moss-dark md:text-5xl">
              A calmer setting for a deeply personal topic.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-stone">
            <p>
              MindCere began with curiosity about brain health after a personal seizure experience. That moment made cognitive wellbeing feel less abstract and much more human.
            </p>
            <p>
              This redesign turns the product into a quiet, responsive focus space where users can learn, reset, and build practical rituals that support everyday attention.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {values.map((value) => (
                <p key={value} className="rounded-2xl bg-mint/70 p-4 text-sm font-black uppercase tracking-[0.12em] text-moss-dark">
                  {value}
                </p>
              ))}
            </div>
            <p className="rounded-3xl bg-sand p-5 text-base font-semibold leading-7 text-stone">
              MindCere is not medical advice and does not diagnose or treat conditions. Anyone with symptoms, questions, or concerns should speak with a qualified clinician.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
