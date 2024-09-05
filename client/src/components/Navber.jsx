import {Logo, MenuIcon} from "@/icons/navIcons";
import {sidebarLinks} from "@/lib";
import Link from "next/link";
import React from "react";

const Navber = () => {
  return (
    <header className="text-white absolute w-full top-0 left-0 z-10 h-32 flex items-center py-5 px-2">
      <nav className="flex items-center justify-between gap-5 max-w-7xl w-10/12 max-lg:w-9/12 max-md:w-11/12 mx-auto">
        <Link href="/" className="logo">
          <Logo />
        </Link>
        <div className="hidden max-lg:block menu">
          <MenuIcon />
        </div>
        <ul className="flex items-center gap-12 max-lg:hidden">
          {sidebarLinks.slice(0, 4).map(link => (
            <li key={link.title} className="capitalize font-semibold">
              <Link href={link.src}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="max-[1290px]:hidden" />
      </nav>
    </header>
  );
};

export default Navber;
