import { Button } from "@/components/ui/button";

export default function Header() {
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
        <div />
        <Button className="rounded-full px-4 py-2 font-semibold text-sm  hover:bg-sky-600">
          <a href="/signup">Sign up</a>
        </Button>
      </div>
    </header>
  );
}
