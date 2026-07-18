import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
};

const FILE = path.join(process.cwd(), "content", "guestbook.json");

async function readEntries(): Promise<GuestbookEntry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as GuestbookEntry[];
  } catch {
    return [];
  }
}

async function writeEntries(entries: GuestbookEntry[]) {
  await fs.writeFile(FILE, JSON.stringify(entries, null, 2) + "\n", "utf8");
}

export async function GET() {
  const entries = await readEntries();
  return NextResponse.json({
    entries: entries.filter((e) => e.approved),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim().slice(0, 80);
    const message = String(body.message ?? "").trim().slice(0, 1000);

    if (!name || !message) {
      return NextResponse.json(
        { error: "name and message are required" },
        { status: 400 }
      );
    }

    const entry: GuestbookEntry = {
      id: `gb-${Date.now().toString(36)}`,
      name,
      message,
      createdAt: new Date().toISOString(),
      // New messages need moderation before public display
      approved: false,
    };

    // On Vercel, the filesystem is read-only except /tmp — persist best-effort.
    // Locally, appends to content/guestbook.json. In production, swap for a DB.
    try {
      const entries = await readEntries();
      entries.push(entry);
      await writeEntries(entries);
    } catch (writeErr) {
      console.warn("guestbook write skipped (read-only FS?):", writeErr);
      // Still accept the message so UX works; log for ops
      console.info("guestbook entry (not persisted):", entry);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thanks! Your note was received and will appear after review.",
      id: entry.id,
    });
  } catch (err) {
    console.error("guestbook POST", err);
    return NextResponse.json(
      { error: "Could not save guestbook entry" },
      { status: 500 }
    );
  }
}
