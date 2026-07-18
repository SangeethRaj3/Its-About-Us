import { formatLongDate } from "@/lib/dates";

export type MemoryReceiptProps = {
  invoiceId: string;
  date: string;
  title: string;
  amountLabel?: string;
  description: string;
  photoUrls?: string[];
};

export function MemoryReceipt({
  invoiceId,
  date,
  title,
  amountLabel = "Priceless",
  description,
  photoUrls = [],
}: MemoryReceiptProps) {
  return (
    <article className="receipt-paper rounded-lg px-5 pb-6 pt-2 shadow-[var(--card-shadow)]">
      <header className="mb-4 border-b border-dashed border-border pb-3 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          US, Inc. · Memory Receipt
        </p>
        <p className="mt-1 font-mono text-sm text-foreground">{invoiceId}</p>
      </header>

      <div className="space-y-3 font-mono text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">Date</span>
          <span>{formatLongDate(date)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Item</span>
          <span className="font-serif text-base text-right">{title}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Amount</span>
          <span className="text-accent font-semibold">{amountLabel}</span>
        </div>
        <p className="border-t border-dashed border-border pt-3 text-muted leading-relaxed">
          {description}
        </p>
      </div>

      {photoUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {photoUrls.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="aspect-square rounded-md object-cover"
            />
          ))}
        </div>
      )}

      <footer className="mt-5 text-center font-mono text-xs text-muted">
        Thank you for your purchase.
        <br />
        No refunds · Auto-renew preferred
      </footer>
    </article>
  );
}
