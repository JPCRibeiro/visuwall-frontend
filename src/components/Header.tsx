import { Link, useLocation, useNavigate } from "react-router";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { useMe } from "@/features/auth/api/queries";
import { UserDropdown } from "@/features/auth/components/UserDropdown";
import { useAuthStatus, useIsSignedIn } from "@/features/auth/hooks/useSession";

const GLASS_STYLE =
  "border-zinc-900 bg-[rgb(19_19_19/75%)] backdrop-blur-[6px] shadow-[inset_0_0_0_0px_rgba(31,31,31,.66),0_0_0px_rgba(0,0,0,.75),0_0_2px_rgba(0,0,0,.75)]";

export default function Header() {
  const status = useAuthStatus();
  const isSignedIn = useIsSignedIn();
  const me = useMe();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const isHomePage = pathname === "/";
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/cadastro";
  const isAuthPage = isLogin || isRegister;

  const username = me.data?.username;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isAuthPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthPage]);

  let isHeaderSolid = false;

  if (isHomePage) {
    isHeaderSolid = isScrolled;
  } else if (!isAuthPage) {
    isHeaderSolid = true;
  }

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 h-16 border-b",
        isHeaderSolid ? GLASS_STYLE : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "items-center flex h-full px-4 justify-between",
          !isHomePage && !isAuthPage ? "" : "container mx-auto",
        )}
      >
        <div className="flex-row flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl select-none font-fascinate text-white">
              VisuWall
            </span>
          </Link>
          {!isHomePage && !isAuthPage && <NavItems />}
        </div>
        <div>
          {status === "loading" ? (
            <div className="h-9 w-24" />
          ) : isSignedIn ? (
            <UserDropdown username={username ?? ""} />
          ) : isLogin ? (
            <Button onClick={() => navigate("/cadastro")}>Criar conta</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Entrar</Button>
          )}
        </div>
      </div>
    </header>
  );
}
