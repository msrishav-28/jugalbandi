export type BulletLocation = {
  section: 'workExperience' | 'personalProjects';
  entry: number;
  bullet: number;
};

export type RepeatedBullet = { text: string; locations: BulletLocation[] };
export type BulletReview =
  | { status: 'complete'; checked: number; repeats: RepeatedBullet[] }
  | { status: 'unavailable'; reason: 'invalid' | 'limit' };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Reviews stored text only; matching is case-sensitive and ignores whitespace. */
export function reviewRepeatedBullets(resume: unknown): BulletReview {
  if (!isRecord(resume)) return { status: 'unavailable', reason: 'invalid' };
  const groups = new Map<string, RepeatedBullet>();
  let checked = 0;
  let characters = 0;
  for (const section of ['workExperience', 'personalProjects'] as const) {
    const entries = resume[section];
    if (entries === undefined) continue;
    if (!Array.isArray(entries)) return { status: 'unavailable', reason: 'invalid' };
    if (entries.length > 250) return { status: 'unavailable', reason: 'limit' };
    for (const [entryIndex, entry] of entries.entries()) {
      if (!isRecord(entry)) return { status: 'unavailable', reason: 'invalid' };
      const bullets = entry.description;
      if (bullets === undefined) continue;
      if (!Array.isArray(bullets)) return { status: 'unavailable', reason: 'invalid' };
      if (bullets.length > 1000) return { status: 'unavailable', reason: 'limit' };
      for (const [bulletIndex, text] of bullets.entries()) {
        if (typeof text !== 'string') return { status: 'unavailable', reason: 'invalid' };
        checked++;
        characters += text.length;
        if (checked > 1000 || text.length > 5000 || characters > 200_000) {
          return { status: 'unavailable', reason: 'limit' };
        }
        const normalized = text.replace(/\s+/gu, ' ').trim();
        if (!normalized) continue;
        const location = { section, entry: entryIndex + 1, bullet: bulletIndex + 1 };
        const group = groups.get(normalized);
        if (group) group.locations.push(location);
        else groups.set(normalized, { text, locations: [location] });
      }
    }
  }
  return {
    status: 'complete',
    checked,
    repeats: [...groups.values()].filter((group) => group.locations.length > 1),
  };
}
