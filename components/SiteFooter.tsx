import Link from "next/link";
import { FOOTER_COPY } from "@/content/site-config";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div className="space-y-2">
          <Logo size="sm" />
          <p className="max-w-md text-sm text-muted">{FOOTER_COPY}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/terms" className="hover:text-accent">
            Terms & Vows
          </Link>
          <Link href="/guestbook" className="hover:text-accent">
            Guestbook
          </Link>
          <Link href="/admin/upload" className="hover:text-accent">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
