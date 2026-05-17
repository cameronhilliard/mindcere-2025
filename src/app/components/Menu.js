"use client"

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const menuItems = [
  { name: "Home", href: "#homepage" },
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
        className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/15"
        onClick={toggleMenu}
        aria-expanded={openMenu}
        aria-label="Toggle navigation menu"
      >
        {openMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {openMenu && (
        <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-2 text-white shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 font-outfit font-bold text-slate-200 transition hover:bg-white/10 hover:text-cyan-100"
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
