import { Suspense } from 'react';
import { IssueDetailsClient } from './IssueDetailsClient';
import { Icon } from '@/components/Icon';

export function generateStaticParams() {
  return [
    { id: 'CF-2024-8841' },
    { id: 'CF-8921' },
    { id: 'CF-8914' },
    { id: 'CF-8882' },
    { id: 'CF-8890' },
    { id: 'CF-8849' },
    { id: 'CF-8935' },
    { id: 'CF-8932' }
  ];
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full px-4 sm:px-space-lg py-20 text-center">
          <div className="max-w-md mx-auto bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container space-y-3">
            <Icon name="refresh" size={36} className="text-primary animate-spin mx-auto" />
            <p className="font-body-md text-body-md text-on-surface font-semibold">
              Loading incident details...
            </p>
          </div>
        </div>
      }
    >
      <IssueDetailsClient id={resolvedParams.id} />
    </Suspense>
  );
}
