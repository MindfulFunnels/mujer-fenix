interface props {
  navLinks?: { href: string; label: string }[];
}

import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

export default function SiteHeader({ navLinks }: props) {
  return (
    <header className='w-full border-b'>
      <div className='flex h-14 items-center px-4'>
        <MainNav navLinks={navLinks} />
        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
