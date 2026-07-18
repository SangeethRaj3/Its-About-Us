type Person = {
  id: string;
  name: string;
  role?: string;
};

type FamilyTreeProps = {
  partnerA?: Person[];
  partnerB?: Person[];
  couple?: [Person, Person];
};

const DEFAULT_A: Person[] = [
  { id: "a-gp1", name: "Veeranan", role: "Grandparent" },
  { id: "a-gp2", name: "Veilumuthu", role: "Grandparent" },
  { id: "a-p1", name: "Bala Murugan", role: "Parent" },
  { id: "a-p2", name: "Bakkiyalakshmi", role: "Parent" },
];

const DEFAULT_B: Person[] = [
  { id: "b-gp1", name: "Mookan", role: "Grandparent" },
  { id: "b-gp2", name: "Irulayi", role: "Grandparent" },
  { id: "b-p1", name: "ChinnaThambi", role: "Parent" },
  { id: "b-p2", name: "PandiSelvi", role: "Parent" },
];

const DEFAULT_COUPLE: [Person, Person] = [
  { id: "s", name: "Sangeeth Raj", role: "Co-founder" },
  { id: "h", name: "Hema Malini", role: "Co-founder" },
];

function Node({ person }: { person: Person }) {
  return (
    <div className="min-w-[7rem] rounded-lg border border-border bg-background px-3 py-2 text-center shadow-sm">
      <p className="text-sm font-medium text-foreground">{person.name}</p>
      {person.role && (
        <p className="text-[10px] uppercase tracking-wide text-muted">
          {person.role}
        </p>
      )}
    </div>
  );
}

/**
 * Simple two-column family tree that merges into the couple at the bottom.
 * Replace placeholder names with real family members over time.
 */
export function FamilyTree({
  partnerA = DEFAULT_A,
  partnerB = DEFAULT_B,
  couple = DEFAULT_COUPLE,
}: FamilyTreeProps) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]">
      <h2 className="mb-6 font-serif text-xl text-foreground">Family tree</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
            S side
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {partnerA.map((p) => (
              <Node key={p.id} person={p} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
            H side
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {partnerB.map((p) => (
              <Node key={p.id} person={p} />
            ))}
          </div>
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <div className="h-8 w-px bg-accent/40" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Node person={couple[0]} />
        <span className="text-2xl text-accent" aria-hidden>
          ♥
        </span>
        <Node person={couple[1]} />
      </div>
      <p className="mt-3 text-center text-sm text-muted">
        Merger complete · US, Inc. · Est. Dec 13, 2026
      </p>
    </section>
  );
}
