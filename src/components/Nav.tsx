import { useState, useRef, useEffect } from "react";
import CTAButton from "./CTAButton";

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
}

export default function Navbar({ navItems, ctaLabel, ctaHref }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className='nav-div fixed top-0 left-0 right-0 z-[9999]'>
      <nav
        className={`w-full pointer-events-auto transition-all duration-300 overflow-x-hidden ${
          isOpen
            ? "backdrop-blur-md bg-[color:var(--color-secondary)/80]"
            : "bg-transparent"
        }`}
      >
        <div className='px-4 mx-auto max-w-7xl sm:px-6'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <a href='#hero' className='flex items-center hover:animate-pulse'>
              <img src='/logo.png' alt='Logo' className='w-40' />
            </a>

            {/* Navegación Desktop */}
            <div className='hidden md:block'>
              <div className='flex items-baseline ml-10 space-x-4'>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className='text-[color:var(--color-text)] hover:text-[color:var(--color-accent)] px-3 py-2 text-sm font-medium transition-colors duration-300'
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Desktop */}
            <div className='hidden md:block'>
              <CTAButton
                href={ctaHref}
                label={ctaLabel}
                className='hover:shadow-none'
              />
            </div>

            {/* Menú móvil */}
            <div className='flex items-center space-x-2 md:hidden'>
              <CTAButton
                href={ctaHref}
                label={ctaLabel}
                className='hover:shadow-none hover:border-2'
              />
              <button
                onClick={handleToggle}
                className='text-[color:var(--color-text)] hover:text-white inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300'
                aria-label='Menú'
              >
                <svg
                  className='w-6 h-6'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Menú móvil montado SIEMPRE + animación */}
          <div
            ref={menuRef}
            className={`md:hidden transform transition-all duration-300 origin-top ${
              isOpen
                ? "scale-y-100 opacity-100 pointer-events-auto"
                : "scale-y-0 opacity-0 pointer-events-none"
            }`}
            style={{ transformOrigin: "top" }}
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleClose}
                  className='text-[color:var(--color-text)] hover:text-[color:var(--color-text-alt)] block px-3 py-2 text-base font-medium transition-colors duration-300'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className='h-16' />
    </div>
  );
}
