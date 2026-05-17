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
  );
};

export default InfoComponent;
