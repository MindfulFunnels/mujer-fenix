"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";

interface props {
  navLinks?: { href: string; label: string }[];
}

export default function MobileNav({ navLinks }: props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden ml-auto'>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side='right'>
        <div className='flex flex-col items-start'>
          {navLinks?.map((link, index) => (
            <Button key={index} variant='link'>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
