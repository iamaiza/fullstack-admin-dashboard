"use client";

import { sidebarLinks } from "../lib";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const location = useLocation();
  const isActive = (relatedPaths) => {
    // Check if the current path is in the relatedPaths array
    return relatedPaths?.some((path) => location.pathname.startsWith(path));
  };

  return (
    <div
      className={`py-4 px-5 fixed w-[17.5rem] text-center max-h-screen h-full transition-all duration-300 z-10 max-[350px]:w-56 ${
        isOpen
          ? "translate-x-0 bg-white shadow-xl"
          : "max-[1200px]:-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="border-b flex items-center py-5 gap-2">
          <figure className="w-9 h-9">
            <img
              className="w-full h-full object-cover"
              src="assets/logo-ct-dark.png"
              alt=""
            />
          </figure>
          <span className="capitalize font-semibold">admin dashboard</span>
        </div>
      </div>
      <div className="pt-8">
        <div className="text-[13px] uppercase font-bold text-gray-400 mb-3 px-3 text-left ml-2">
          pages
        </div>
        <div className="flex flex-col gap-2">
          {sidebarLinks.slice(0, 4).map((link) => (
            <NavLink to={link.src} key={link.title} className={`flex items-center gap-3 w-full h-full py-2.5 px-7 rounded-lg ${
              isActive(link.relatedPaths) ? 'active' : ''
            }`}>
              <figure className="w-8 h-8 bg-black rounded-lg flex items-center justify-center bg-linear-gradient">
                <img src={link?.icon} alt="" />
              </figure>
              <span className="text-sm capitalize text-gray-500 font-semibold">
                {link.title}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
