'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';
import { reviewRepeatedBullets } from '@/lib/utils/repeated-bullets';

export function LocalBulletReview({ resume, onEdit }: { resume: unknown; onEdit: () => void }) {
  const { t } = useTranslations();
  const review = useMemo(() => reviewRepeatedBullets(resume), [resume]);
  return (
    <details className="no-print mb-6 border-2 border-black bg-background">
      <summary className="cursor-pointer p-4 font-mono text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
        {t('localReview.title')}
      </summary>
      <div className="space-y-4 border-t border-black p-4">
        <p className="text-sm text-steel-grey">{t('localReview.scope')}</p>
        {review.status === 'unavailable' ? (
          <p role="status">{t(`localReview.${review.reason}`)}</p>
        ) : review.checked === 0 ? (
          <p>{t('localReview.empty')}</p>
        ) : review.repeats.length === 0 ? (
          <p>{t('localReview.clear', { count: review.checked })}</p>
        ) : (
          <>
            <p>{t('localReview.found', { count: review.repeats.length })}</p>
            <p className="text-sm">{t('localReview.advice')}</p>
            <ol className="list-decimal space-y-4 pl-6">
              {review.repeats.slice(0, 20).map((group, index) => (
                <li key={index}>
                  <blockquote className="whitespace-pre-wrap break-words border-l-2 border-black pl-3 text-sm">
                    {group.text.length > 240 ? `${group.text.slice(0, 240)}…` : group.text}
                  </blockquote>
                  <ul className="mt-2 list-disc pl-5 text-sm text-steel-grey">
                    {group.locations.map((location) => (
                      <li key={`${location.section}-${location.entry}-${location.bullet}`}>
                        {t(`localReview.${location.section}`, {
                          entry: location.entry,
                          bullet: location.bullet,
                        })}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            {review.repeats.length > 20 && <p>{t('localReview.more')}</p>}
            <Button variant="outline" onClick={onEdit}>
              {t('localReview.edit')}
            </Button>
          </>
        )}
      </div>
    </details>
  );
}
