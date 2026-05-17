"use client"

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const menuItems = [
  { name: "Home", href: "#homepage" },
  { name: "Daily Tip", href: "#daily-tip" },
  { name: "Insights", href: "#insights" },
  { name: "About", href: "#about" },
];

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((isOpen) => !isOpen);
  };

  return (
    <div className="relative">
      <button
        className="rounded-full border border-sage-200 bg-white p-2 text-navy transition hover:bg-sage-50 focus:outline-none focus:ring-4 focus:ring-sage-100 md:hidden"
        onClick={toggleMenu}
        aria-expanded={openMenu}
        aria-label="Toggle navigation menu"
      >
        {openMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <ul className="hidden items-center gap-7 font-inter text-sm font-bold text-slate-700 md:flex">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-sage-800 focus:outline-none focus:ring-4 focus:ring-sage-100">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {openMenu && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-sage-100 bg-white p-2 shadow-[0_18px_60px_rgba(29,53,87,0.12)] md:hidden">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 font-inter font-bold text-slate-700 transition hover:bg-sage-50 hover:text-sage-800 focus:outline-none focus:ring-4 focus:ring-sage-100"
                  onClick={toggleMenu}
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
