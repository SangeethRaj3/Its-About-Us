export type MapPin = {
  id: string;
  label: string;
  place: string;
  /** Approximate position as % of map box (0–100) */
  x: number;
  y: number;
  year?: string;
};

const DEFAULT_PINS: MapPin[] = [
  {
    id: "p1",
    label: "First date",
    place: "Home city",
    x: 42,
    y: 55,
    year: "2023",
  },
  {
    id: "p2",
    label: "Weekend escape",
    place: "Coast",
    x: 58,
    y: 48,
    year: "2023",
  },
  {
    id: "p3",
    label: "Proposal",
    place: "Somewhere perfect",
    x: 48,
    y: 38,
    year: "2025",
  },
  {
    id: "p4",
    label: "Wedding venue",
    place: "Dec 13, 2026",
    x: 52,
    y: 62,
    year: "2026",
  },
];

export type MapOfUsProps = {
  pins?: MapPin[];
  title?: string;
};

/**
 * Lightweight stylized map — pins are illustrative positions, not geo-accurate.
 * Swap for Mapbox/Leaflet later if you want real coordinates.
 */
export function MapOfUs({
  pins = DEFAULT_PINS,
  title = "Map of Us",
}: MapOfUsProps) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl text-foreground">{title}</h2>
        <span className="text-xs text-muted">{pins.length} pins logged</span>
      </div>

      <div
        className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, #d4e4d4 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #d8e0e8 0%, transparent 45%), linear-gradient(160deg, #e8e4dc 0%, #d9e0d4 40%, #cfd8e0 100%)",
        }}
      >
        {/* soft grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,27,22,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(31,27,22,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {pins.map((pin) => (
          <div
            key={pin.id}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-1 hidden min-w-[8rem] rounded-md border border-border bg-background px-2 py-1 text-center text-xs shadow-md group-hover:block">
                <p className="font-medium text-foreground">{pin.label}</p>
                <p className="text-muted">
                  {pin.place}
                  {pin.year ? ` · ${pin.year}` : ""}
                </p>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-accent text-[10px] text-white shadow-md">
                ♥
              </span>
              <span className="h-2 w-px bg-accent/60" />
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {pins.map((pin) => (
          <li
            key={pin.id}
            className="flex items-center gap-2 text-sm text-muted"
          >
            <span className="text-accent">●</span>
            <span>
              <strong className="font-medium text-foreground">{pin.label}</strong>
              {" — "}
              {pin.place}
              {pin.year ? ` (${pin.year})` : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
