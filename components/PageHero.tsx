type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="mb-10 space-y-3">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
