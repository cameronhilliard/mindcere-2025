"use client"

import Link from "next/link";
import Menu from "./Menu";

const HeaderComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-sage-100 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="#homepage" className="font-serif text-2xl font-semibold tracking-[-0.03em] text-navy">
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
