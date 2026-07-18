type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
};

export function Logo({
  className = "",
  size = "md",
  showWordmark = true,
}: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-tight ${sizes[size]} ${className}`}
    >
      <span
        className="inline-flex h-[1.4em] w-[1.4em] items-center justify-center rounded-lg border border-border bg-surface text-[0.7em] shadow-sm"
        aria-hidden
      >
        <span className="text-foreground">S</span>
        <span className="mx-px text-accent">♥</span>
        <span className="text-foreground">H</span>
      </span>
      {showWordmark && (
        <span className="font-sans">
          US, <span className="text-accent">Inc.</span>
        </span>
      )}
    </span>
  );
}
