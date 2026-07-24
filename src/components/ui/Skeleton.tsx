export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`skeleton ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-border">
      <Skeleton className="h-48 w-full !rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="h-[90vh] bg-gray-200 dark:bg-dark-bg rounded-none">
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-14 w-[600px] max-w-[90vw] mx-auto" />
          <Skeleton className="h-5 w-96 max-w-[80vw] mx-auto" />
          <div className="flex gap-3 justify-center pt-4">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
