import { NextResponse } from "next/server";
import { getPresignedGetUrl, isS3Configured } from "@/lib/s3";

export async function GET(request: Request) {
  if (!isS3Configured()) {
    return NextResponse.json(
      { error: "S3 is not configured." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key || key.includes("..") || key.startsWith("/")) {
    return NextResponse.json({ error: "valid key is required" }, { status: 400 });
  }

  try {
    const url = await getPresignedGetUrl(key);
    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("s3-get-url", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create get URL" },
      { status: 500 }
    );
  }
}
