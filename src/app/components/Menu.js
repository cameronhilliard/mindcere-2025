"use client"
import React, {useState} from 'react'
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const Menu = () => {

    const [openMenu, setOpenMenu] = useState(false);


    const menuItems = [
        { name: 'Home', href: '#homepage' },
        { name: 'Insights', href: '#insights' },
        { name: 'About', href: '#about' },
      ];

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
      };
    
      
  return (
    <div>
         <button
        className=" text-white font-mont font-bold rounded-md"
        onClick={toggleMenu}
      >
        {openMenu ? <XMarkIcon className='h-6 w-8 text-accent'/> : <Bars3Icon className=' h-8 w-8 text-accent'/>}
      </button>


      {openMenu && (
        <div className="absolute  mt-2 z-50 right-0 lg:mr-12 lg:w-48 w-full  mx-auto dark:bg-zinc-800 bg-offwhite text-accent dark:text-white transition-transform animate-fade-down lg:rounded-lg shadow-lg">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="block px-4 py-2 dark:text-white  font-outfit font-bold  text-accent hover:text-accent"
                    onClick={toggleMenu}
                    >{item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
   


export default Menu