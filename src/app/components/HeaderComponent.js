import Link from "next/link";
import Menu from "./Menu";

const HeaderComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-moss/10 bg-sand/80 px-4 py-3 text-ink shadow-lg shadow-moss/10 backdrop-blur-xl sm:px-5">
        <Link
          href="#homepage"
          className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-4 focus:ring-moss/15"
          aria-label="MindCere home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-moss text-sm font-black text-sand shadow-lg shadow-moss/20">
            MC
          </span>
          <span className="leading-none">
            <span className="block font-outfit text-lg font-black tracking-tight text-moss-dark">MindCere</span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.24em] text-stone sm:block">Calm Focus AI</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <Menu />
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
