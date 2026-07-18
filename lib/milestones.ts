import milestonesData from "@/content/milestones.json";
import { getAnniversaryInvoices } from "@/lib/dates";

export type MilestoneCategory =
  | "trial"
  | "pre-wedding"
  | "wedding"
  | "post-wedding"
  | "anniversary"
  | "family";

export type Milestone = {
  id: string;
  date: string;
  title: string;
  category: MilestoneCategory;
  description: string;
  amountLabel?: string;
  photoKeys: string[];
};

export function getMilestones(): Milestone[] {
  return milestonesData as Milestone[];
}

export function getMilestonesByCategory(
  category: MilestoneCategory
): Milestone[] {
  return getMilestones()
    .filter((m) => m.category === category)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Static milestones + auto anniversary renewals */
export function getBillingHistory(now: Date = new Date()): Milestone[] {
  const staticOnes = getMilestones();
  const anniversaries = getAnniversaryInvoices(now) as Milestone[];
  return [...staticOnes, ...anniversaries].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}
