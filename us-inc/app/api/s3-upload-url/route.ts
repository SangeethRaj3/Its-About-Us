import { NextResponse } from "next/server";
import {
  buildObjectKey,
  getPresignedUploadUrl,
  isS3Configured,
} from "@/lib/s3";

const ALLOWED_CATEGORIES = new Set([
  "trial",
  "pre-wedding",
  "wedding",
  "post-wedding",
  "family",
  "anniversaries",
  "photos",
  "trips",
  "playlists",
  "fights",
]);

const FOLDER_CATEGORIES = new Set(["trips", "playlists", "fights"]);

export async function POST(request: Request) {
  if (!isS3Configured()) {
    return NextResponse.json(
      {
        error:
          "S3 is not configured. Set AWS credentials in .env.local (see .env.example).",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const filename = String(body.filename ?? "");
    const contentType = String(body.contentType ?? "application/octet-stream");
    const category = String(body.category ?? "trial");
    const folderSlug =
      body.folderSlug != null ? String(body.folderSlug).trim() : undefined;

    if (!filename) {
      return NextResponse.json({ error: "filename is required" }, { status: 400 });
    }
    if (!ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json({ error: "invalid category" }, { status: 400 });
    }
    if (FOLDER_CATEGORIES.has(category) && !folderSlug) {
      return NextResponse.json(
        {
          error:
            "folderSlug is required for trips, playlists, and fights (one folder per item).",
        },
        { status: 400 }
      );
    }

    const key = buildObjectKey(category, filename, folderSlug);
    const uploadUrl = await getPresignedUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, key });
  } catch (err) {
    console.error("s3-upload-url", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to create upload URL",
      },
      { status: 500 }
    );
  }
}
