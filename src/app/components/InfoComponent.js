const colors = ["bg-mint text-moss-dark", "bg-pond/70 text-moss-dark", "bg-clay/15 text-clay"];

const InfoComponent = ({ prompts, response, index = 0 }) => {
  return (
    <article className="focus-card rounded-[1.75rem] border border-white/70 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/85 md:p-7">
      <span className={`grid h-12 w-12 place-items-center rounded-2xl font-inter text-sm font-black ${colors[index % colors.length]}`}>
        0{index + 1}
      </span>
      <h3 className="mt-6 text-2xl font-black leading-tight tracking-[-0.04em] text-moss-dark">{prompts}</h3>
      <p className="mt-4 text-base leading-7 text-stone">{response}</p>
    </article>
  );
};

export default InfoComponent;
