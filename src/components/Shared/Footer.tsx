export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* <Logo /> */}
        <div />
        <p className="text-sm text-gray-600 mb-4">
          Get connected and Store Images
        </p>
        <nav className="flex justify-center space-x-4 md:space-x-6  mb-4 ">
          <a href="#" className=" text-black hover:text-amber-300">
            About
          </a>
          <a href="#" className=" text-black hover:text-teal-500">
            Privacy
          </a>
          <a href="#" className=" text-black hover:text-indigo-400">
            Terms
          </a>
          <a href="#" className=" text-black hover:text-red-400">
            Contact
          </a>
        </nav>
        <p className="text-sm text-gray-500 pb-10 italic">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:text-amber-300">
            {" "}
            Image Gallery{" "}
          </a>
          by Plain Sight Ventures
        </p>
      </div>
    </footer>
  );
}
