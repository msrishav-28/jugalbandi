import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/home/hero';
import { APP_NAME, getVersionString } from '@/lib/config/version';
import { locales } from '@/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

vi.mock('@/lib/i18n', () => ({
  useTranslations: () => ({ t: (key: string) => key }),
}));

describe('Jugalbandi product identity', () => {
  it('shows the product name and keeps the application entry available', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^Jugalbandi$/);
    expect(screen.getByRole('link', { name: 'home.launchApp' })).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/msrishav-28/jugalbandi'
    );
  });

  it('identifies the application in its existing version display', () => {
    expect(APP_NAME).toBe('Jugalbandi');
    expect(getVersionString()).toMatch(/^Jugalbandi v/);
  });

  it.each(locales)('uses the same product name in %s upload guidance', (locale) => {
    expect(getMessages(locale).resumeWizard.entry.upload.description).toContain('Jugalbandi');
  });
});
