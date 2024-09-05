"use client";

import { routeCategories, sidebarLinks } from "../lib";
import { closeSidebarHandler } from "../store/sidebarSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location?.pathname;

  const updateLinkInLS = (id) => {
    setIsActive(id);
    localStorage.setItem("active-link", JSON.stringify({ activeLink: id }));
  };
  useEffect(() => {
    const storedLink = JSON.parse(localStorage.getItem("active-link"));
    const storedCategory = storedLink ? storedLink.activeLink : "dashboard";
    const matchCategory = (path) => {
      for (const [category, paths] of Object.entries(routeCategories)) {
        if (paths.some((p) => path.startsWith(p))) {
          return category;
        }
      }
      return "dashboard";
    };
    const activeLink = matchCategory(pathname) || storedCategory;
    updateLinkInLS(activeLink);
  }, [pathname]);

  const setActiveLinkHandler = (id) => {
    dispatch(closeSidebarHandler());
    setIsActive(id);
    updateLinkInLS(id);
    navigate(id === "dashboard" ? "/" : `/${id}`);
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
        <ul className="flex flex-col gap-2">
          {sidebarLinks.slice(0, 4).map((link) => (
            <li
              className={`py-2.5 px-7 rounded-lg link ${
                isActive === link.title
                  ? "bg-white shadow-lg max-[1200px]:shadow-none"
                  : ""
              }`}
              onClick={() => setActiveLinkHandler(link.title)}
              key={link.title}
            >
              <Link
                key={link.title}
                to={link.src}
                className="flex items-center gap-3 w-full h-full"
              >
                <figure className="w-8 h-8 bg-black rounded-lg flex items-center justify-center bg-linear-gradient">
                  <img src={link?.icon} alt="" />
                </figure>
                <span className="text-sm capitalize text-gray-500 font-semibold">
                  {link.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
