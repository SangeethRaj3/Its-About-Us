import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION ?? "ap-southeast-2";
const bucket = process.env.AWS_S3_BUCKET ?? "our-life";

function getClient() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local"
    );
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET
  );
}

export function getBucket() {
  return bucket;
}

export function getRegion() {
  return region;
}

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|heic|avif|bmp|tiff?)$/i;

/**
 * Build an object key.
 * - category "trips" + tripSlug → trips/{tripSlug}/{stamp}-{file}
 * - category "playlists" | "fights" + folderSlug → {category}/{folderSlug}/...
 * - otherwise → {category}/{stamp}-{file}
 */
export function buildObjectKey(
  category: string,
  filename: string,
  folderSlug?: string
): string {
  const safe = filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const stamp = Date.now();
  const name = `${stamp}-${safe || "upload"}`;

  if (
    (category === "trips" ||
      category === "playlists" ||
      category === "fights") &&
    folderSlug
  ) {
    const slug = folderSlug
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `${category}/${slug || "untitled"}/${name}`;
  }

  return `${category}/${name}`;
}

const UPLOAD_EXPIRES = 60 * 5;
const GET_EXPIRES = 60 * 15;

export async function getPresignedUploadUrl(
  key: string,
  contentType: string
): Promise<string> {
  const client = getClient();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(client, command, { expiresIn: UPLOAD_EXPIRES });
}

export async function getPresignedGetUrl(key: string): Promise<string> {
  const client = getClient();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn: GET_EXPIRES });
}

/** List first-level “folder” names under a prefix (CommonPrefixes). */
export async function listFolderNames(prefix: string): Promise<string[]> {
  if (!isS3Configured()) return [];

  const client = getClient();
  const names: string[] = [];
  let token: string | undefined;

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`,
        Delimiter: "/",
        ContinuationToken: token,
      })
    );
    for (const p of res.CommonPrefixes ?? []) {
      if (!p.Prefix) continue;
      // trips/bali-2026/ → bali-2026
      const part = p.Prefix.slice(prefix.length).replace(/\/$/, "");
      if (part) names.push(part);
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return names;
}

/** Count objects under a prefix (optionally only image-like keys). */
export async function countObjects(
  prefix: string,
  opts?: { imagesOnly?: boolean }
): Promise<number> {
  if (!isS3Configured()) return 0;

  const client = getClient();
  let count = 0;
  let token: string | undefined;

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token,
      })
    );
    for (const obj of res.Contents ?? []) {
      if (!obj.Key || obj.Key.endsWith("/")) continue;
      if (opts?.imagesOnly && !IMAGE_EXT.test(obj.Key)) continue;
      count += 1;
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return count;
}
