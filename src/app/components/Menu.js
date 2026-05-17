"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const menuItems = [
  { name: "Home", href: "#homepage" },
  { name: "Focus AI", href: "#focus-ai" },
  { name: "Daily Tip", href: "#daily-tip" },
  { name: "Insights", href: "#insights" },
  { name: "About", href: "#about" },
];

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => setOpenMenu(false);

  return (
    <div className="relative">
      <button
        className="inline-flex rounded-full border border-moss/15 bg-white/70 p-2 text-moss-dark shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-moss/15 md:hidden"
        onClick={() => setOpenMenu((isOpen) => !isOpen)}
        aria-expanded={openMenu}
        aria-label="Toggle navigation menu"
        type="button"
      >
        {openMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <ul className="hidden items-center gap-6 font-inter text-sm font-bold text-stone md:flex">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-full px-2 py-2 transition hover:text-moss-dark focus:outline-none focus:ring-4 focus:ring-moss/15"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {openMenu && (
        <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-3xl border border-moss/10 bg-sand/95 p-2 text-moss-dark shadow-2xl shadow-moss/15 backdrop-blur-xl md:hidden">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 font-inter font-bold transition hover:bg-mint focus:outline-none focus:ring-4 focus:ring-moss/15"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
