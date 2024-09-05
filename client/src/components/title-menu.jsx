import {Link} from "react-router-dom";
import { MenuIcon } from "../icons/navIcons";
import { toggleSidebarHandler } from "../store/sidebarSlice";
import React from "react";
import { useDispatch } from "react-redux";

const TitleMenu = (props) => {
  const { pageType, pageName, href } = props;
  const dispatch = useDispatch();
  const showSidebarHandler = () => {
    dispatch(toggleSidebarHandler());
  };
  return (
    <div className={`mt-5 ${pageType !== "pages" ? "mx-5" : 0}`}>
      <div className="flex items-center gap-5 max-[1200px]:justify-between">
        <div className="flex items-center gap-1.5 text-sm capitalize">
          <Link to='/'>
            <img src="assets/dashboard-icon.svg" alt="" />
          </Link>
          <span>/</span>
          <Link to={pageType === "pages" ? "/" : href} className="text-[#344767] opacity-50">{pageType}</Link>
          <span>/</span>
          <span className="text-[#344767] opacity-90">
            {!pageName ? "dashboard" : pageName}
          </span>
        </div>
        <div className="hidden max-[1200px]:block" onClick={showSidebarHandler}>
          <MenuIcon />
        </div>
      </div>
      <div className="mt-3 capitalize font-semibold text-slate-700">
        {!pageName ? "dashboard" : pageName}
      </div>
    </div>
  );
};

export default TitleMenu;
