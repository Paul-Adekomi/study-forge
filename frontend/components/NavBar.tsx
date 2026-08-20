import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full fixed top-0 left-0 h-max border-b border-gray-600 px-4 md:px-8 py-4 flex items-center justify-between flex-wrap bg-background z-50">
      <Link className="flex items-center gap-2" href="/">
        <img src="studyforge-logo.svg" alt="icon logo" />
        <span className="text-primary text-2xl md:text-3xl font-heading font-bold">
          StudyForge
        </span>
      </Link>

      <ul className="md:flex hidden list-none text-gray-300 font-semibold  items-center gap-2">
        <li>
          <a href="/" className="hover:text-white">
            Features
          </a>
        </li>
        <li>
          <a href="/" className="hover:text-white">
            How it works
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="md:block hidden text-gray-300 font-semibold hover:text-white cursor-pointer"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="w-max bg-primary hover:bg-primary-hover text-background px-4 py-2 rounded-sm cursor-pointer font-heading"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
