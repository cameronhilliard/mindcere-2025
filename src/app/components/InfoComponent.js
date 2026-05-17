const InfoComponent = ({ prompts, response, index = 0 }) => {
  return (
    <article className="rounded-[1.5rem] border border-sage-100 bg-white p-7 shadow-[0_18px_60px_rgba(29,53,87,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(29,53,87,0.1)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 font-inter text-sm font-bold text-sage-800">
        {index + 1}
      </span>
      <h3 className="mt-7 font-serif text-2xl font-semibold leading-tight tracking-[-0.03em] text-navy">
        {prompts}
      </h3>
      <p className="mt-5 text-base leading-8 text-slate-700">{response}</p>
    </article>
import * as motion from "motion/react-client";

const InfoComponent = ({ prompts, response, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl shadow-slate-950/30 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-200/30 hover:bg-white/[0.1]"
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-300/20 blur-2xl transition group-hover:bg-cyan-200/30" />
      <div className="relative z-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-200/15 text-sm font-black text-cyan-100">
          0{index + 1}
        </span>
        <h3 className="mt-6 text-2xl font-black leading-tight text-white">{prompts}</h3>
        <p className="mt-5 text-base leading-8 text-slate-300">{response}</p>
      </div>
    </motion.article>
  );
};

export default InfoComponent;
