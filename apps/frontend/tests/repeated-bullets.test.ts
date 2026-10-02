import { describe, expect, it } from 'vitest';
import { reviewRepeatedBullets } from '@/lib/utils/repeated-bullets';

describe('local repeated-bullet review', () => {
  it('preserves evidence and locates repeats within and across sections without mutation', () => {
    const data = {
      workExperience: [{ description: ['Built APIs', ' Built  APIs ', 'Other work'] }],
      personalProjects: [{ description: ['Built APIs'] }],
    };
    const original = structuredClone(data);
    expect(reviewRepeatedBullets(data)).toEqual({
      status: 'complete',
      checked: 4,
      repeats: [
        {
          text: 'Built APIs',
          locations: [
            { section: 'workExperience', entry: 1, bullet: 1 },
            { section: 'workExperience', entry: 1, bullet: 2 },
            { section: 'personalProjects', entry: 1, bullet: 1 },
          ],
        },
      ],
    });
    expect(data).toEqual(original);
  });

  it('does not invent findings for empty, distinct, or differently cased text', () => {
    expect(reviewRepeatedBullets({})).toEqual({ status: 'complete', checked: 0, repeats: [] });
    expect(
      reviewRepeatedBullets({ workExperience: [{ description: ['', ' ', 'API', 'api'] }] })
    ).toEqual({ status: 'complete', checked: 4, repeats: [] });
  });

  it('supports Unicode without language-specific interpretation', () => {
    const result = reviewRepeatedBullets({
      personalProjects: [{ description: ['开发 系统', '开发\n系统'] }],
    });
    expect(result.status === 'complete' && result.repeats.length).toBe(1);
  });

  it.each([
    null,
    [],
    { workExperience: null },
    { personalProjects: [null] },
    { workExperience: [{ description: 'text' }] },
    { workExperience: [{ description: [42] }] },
  ])('returns unavailable for malformed data: %j', (data) => {
    expect(reviewRepeatedBullets(data)).toEqual({ status: 'unavailable', reason: 'invalid' });
  });

  it.each([
    { workExperience: Array.from({ length: 251 }, () => ({})) },
    { workExperience: [{ description: ['x'.repeat(5001)] }] },
    { workExperience: [{ description: Array(1001).fill('x') }] },
    {
      workExperience: [{ description: Array(1000).fill('x') }],
      personalProjects: [{ description: ['x'] }],
    },
    { workExperience: [{ description: Array(41).fill('x'.repeat(5000)) }] },
  ])('reports resource limits instead of a misleading partial success', (data) => {
    expect(reviewRepeatedBullets(data)).toEqual({ status: 'unavailable', reason: 'limit' });
  });
});
