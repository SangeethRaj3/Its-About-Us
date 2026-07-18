import { S3_PREFIXES } from "@/content/site-config";
import { daysTogether } from "@/lib/dates";
import { countObjects, isS3Configured, listFolderNames } from "@/lib/s3";

export type ArchiveStats = {
  daysTogether: number;
  photosCaptured: number;
  tripsTaken: number;
  fightsSurvived: number;
  playlistsMade: number;
  /** Always shown as uptime string; not from S3 */
  systemUptime: string;
  /** Whether counts came from live S3 (false → all zeros except days) */
  fromS3: boolean;
};

/**
 * Live metrics from S3 folder layout.
 * When S3 is not configured (or empty), photo/trip/etc. counts are 0.
 * Days together still uses RELATIONSHIP_START date math.
 */
export async function getArchiveStats(
  now: Date = new Date()
): Promise<ArchiveStats> {
  const base: ArchiveStats = {
    daysTogether: daysTogether(now),
    photosCaptured: 0,
    tripsTaken: 0,
    fightsSurvived: 0,
    playlistsMade: 0,
    systemUptime: "99.9%",
    fromS3: false,
  };

  if (!isS3Configured()) {
    return base;
  }

  try {
    const [photoCount, tripFolders, fightFolders, playlistFolders, chapterPhotos] =
      await Promise.all([
        countObjects(S3_PREFIXES.photos, { imagesOnly: true }),
        listFolderNames(S3_PREFIXES.trips),
        listFolderNames(S3_PREFIXES.fights),
        listFolderNames(S3_PREFIXES.playlists),
        // Also count images living under chapter prefixes (trial, wedding, …)
        Promise.all(
          [
            "trial/",
            "pre-wedding/",
            "wedding/",
            "post-wedding/",
            "family/",
            "anniversaries/",
          ].map((p) => countObjects(p, { imagesOnly: true }))
        ).then((nums) => nums.reduce((a, b) => a + b, 0)),
      ]);

    return {
      ...base,
      photosCaptured: photoCount + chapterPhotos,
      tripsTaken: tripFolders.length,
      fightsSurvived: fightFolders.length,
      playlistsMade: playlistFolders.length,
      fromS3: true,
    };
  } catch (err) {
    console.error("getArchiveStats", err);
    return base;
  }
}
