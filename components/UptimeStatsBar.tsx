import type { ArchiveStats } from "@/lib/stats";

export type UptimeStatsBarProps = {
  stats: ArchiveStats;
};

export function UptimeStatsBar({ stats }: UptimeStatsBarProps) {
  const items = [
    { label: "Days together", value: String(stats.daysTogether) },
    { label: "Photos captured", value: String(stats.photosCaptured) },
    { label: "Trips taken", value: String(stats.tripsTaken) },
    { label: "Fights survived", value: String(stats.fightsSurvived) },
    { label: "Playlists made", value: String(stats.playlistsMade) },
    { label: "System uptime", value: stats.systemUptime },
  ];

  return (
    <section
      aria-label="System uptime statistics"
      className="rounded-xl border border-border bg-surface p-4 shadow-[var(--card-shadow)] sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          System metrics
          {!stats.fromS3 && (
            <span className="ml-2 font-normal normal-case tracking-normal">
              (awaiting S3 archive)
            </span>
          )}
        </h2>
        <span className="rounded-full bg-sage-soft px-2 py-0.5 text-xs font-medium text-sage">
          {stats.systemUptime} uptime
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <li
            key={item.label}
            className="rounded-lg border border-border/60 bg-background px-3 py-2.5"
          >
            <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
              {item.value}
            </p>
            <p className="text-xs text-muted">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
