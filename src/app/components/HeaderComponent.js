"use client"

import Link from "next/link";
import Menu from "./Menu";

const HeaderComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-sage-100 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="#homepage" className="font-serif text-2xl font-semibold tracking-[-0.03em] text-navy">
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-5 py-3 text-maintext shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <Link href="#homepage" className="flex items-center gap-3 font-outfit text-lg font-black tracking-tight text-white">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/70" />
          MindCere
        </Link>
        <nav aria-label="Primary navigation">
          <Menu />
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
