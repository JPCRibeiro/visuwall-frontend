import { Link, useLocation } from "react-router";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const GLASS_STYLE = "border-zinc-900 bg-[rgb(19_19_19/75%)] backdrop-blur-[6px] shadow-[inset_0_0_0_0px_rgba(31,31,31,.66),0_0_0px_rgba(0,0,0,.75),0_0_2px_rgba(0,0,0,.75)]";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeaderSolid = !isHomePage || isScrolled;

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 h-16 border-b",
        isHeaderSolid 
          ? GLASS_STYLE
          : "border-transparent bg-transparent"
      )}
    >
      <div className={cn("items-center flex h-full px-4", !isHomePage ? "" : "container mx-auto")}>
        <div className="flex-row flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl select-none font-fascinate text-white">
              VisuWall
            </span>
          </Link>
          {!isHomePage && <NavItems />}
        </div>
      </div>
    </header>
  );
}
