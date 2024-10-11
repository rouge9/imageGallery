import { Button } from "@/components/ui/button";
import { useState } from "react";
// import Logo from "./Logo";

export default function Header() {
  const [isHover, setIsHover] = useState(false);
  return (
    <header className=" py-4 relative">
      {/* desktop */}
      <div className="hidden md:grid grid-cols-3 items-center">
        <div className="hidden md:flex"></div>
        {/* <Logo /> */}
        <div />
        <nav className="flex space-x-4 justify-center items-center">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 font-semibold text-sm  hover:bg-amber-300"
          >
            <a href="/login">Login</a>
          </Button>
          <Button className="rounded-full px-6 py-2 font-semibold text-sm  hover:bg-sky-600">
            <a href="/signup">Sign up</a>
          </Button>
        </nav>
      </div>
      {/* mobile */}
      <div className="md:hidden flex flex-row justify-between items-center">
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 font-semibold text-sm  hover:bg-amber-300"
        >
          <a href="/login">Login</a>
        </Button>
        <div
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsHover(!isHover)}
        >
          {isHover ? (
            <img
              src="/assets/img/logoColors.svg"
              alt="Jive Logo"
              width={80}
              height={30}
              className="h-8 md:h-10"
            />
          ) : (
            <img
              src="/assets/img/logoFull.svg"
              alt="Jive Logo"
              width={80}
              height={30}
              className="h-8 md:h-10"
            />
          )}
        </div>
        <Button className="rounded-full px-4 py-2 font-semibold text-sm  hover:bg-sky-600">
          <a href="/signup">Sign up</a>
        </Button>
      </div>
    </header>
  );
}
