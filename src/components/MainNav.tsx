"use client";
import { Button } from "./ui/button";

interface props {
  navLinks?: { href: string; label: string }[];
}

export default function MainNav({ navLinks }: props) {
  return (
    <div className='mr-4 hidden gap-2 md:flex'>
      {navLinks?.map((link, index) => (
        <Button asChild key={index} variant='link'>
          <a href={link.href}>{link.label}</a>
        </Button>
      ))}
    </div>
  );
}
