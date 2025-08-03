interface Props {
  href: string;
  label: string;
  className?: string;
}

export default function CTAButton({ href, label, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-block px-4 py-2 text-sm font-semibold text-white bg-[color:var(--color-accent)] rounded-md transition-colors duration-300 hover:bg-[color:var(--color-accent-dark)] ${className}`}
    >
      {label}
    </a>
  );
}
