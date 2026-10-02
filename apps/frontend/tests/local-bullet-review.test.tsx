import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LocalBulletReview } from '@/components/resume/local-bullet-review';
import messages from '@/messages/en.json';

vi.mock('@/lib/i18n', () => ({
  useTranslations: () => ({
    t: (key: string, params: Record<string, string | number> = {}) => {
      const value =
        Object.entries(messages.localReview).find(([name]) => `localReview.${name}` === key)?.[1] ??
        key;
      return value.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? ''));
    },
  }),
}));

describe('local review panel', () => {
  it('shows evidence as text, opens the existing editor, and refreshes on new data', () => {
    const onEdit = vi.fn();
    const bullet = '<script>alert(1)</script>';
    const { container, rerender } = render(
      <LocalBulletReview
        resume={{ workExperience: [{ description: [bullet, bullet] }] }}
        onEdit={onEdit}
      />
    );
    const summary = screen.getByText(messages.localReview.title);
    fireEvent.click(summary);
    expect(screen.getByText(bullet)).toBeInTheDocument();
    expect(container.querySelector('script')).toBeNull();
    expect(screen.getByText('Work experience 1, bullet 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: messages.localReview.edit }));
    expect(onEdit).toHaveBeenCalledOnce();
    rerender(
      <LocalBulletReview
        resume={{ workExperience: [{ description: ['Unique'] }] }}
        onEdit={onEdit}
      />
    );
    expect(screen.queryByText(bullet)).not.toBeInTheDocument();
    expect(
      screen.getByText('Checked 1 bullet entries; no repeated non-empty text found.')
    ).toBeInTheDocument();
    expect(container.querySelector('details')).toHaveClass('no-print');
  });

  it('distinguishes no data from malformed data', () => {
    const { rerender } = render(<LocalBulletReview resume={{}} onEdit={vi.fn()} />);
    expect(screen.getByText(messages.localReview.empty)).toBeInTheDocument();
    rerender(<LocalBulletReview resume={null} onEdit={vi.fn()} />);
    expect(screen.getByText(messages.localReview.invalid)).toBeInTheDocument();
    expect(screen.queryByText(messages.localReview.empty)).not.toBeInTheDocument();
  });
});
