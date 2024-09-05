"use client";

import TitleMenu from "../components/title-menu";
import { useLocation } from "react-router-dom"

export default function Home() {
  // const pathname = usePathname();
  // const path = pathname.slice(1);
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1)

  return (
    <div className="px-5">
      <TitleMenu pageType="pages" pageName={path} />
    </div>
  );
}
