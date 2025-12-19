import Link from "next/link";

interface LogoProps {
  locale?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  locale = "en",
  className = "",
  size = "md",
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href={`/${locale}`}
      className={`flex items-center space-x-2 ${className}`}
    >
      <span
        className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent`}
      >
        RK
      </span>
    </Link>
  );
}
