export const QuotaCardSkeleton = () => {
  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur p-5 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
        </div>
        <div className="h-7 w-8 rounded bg-muted" />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted" />
        <div className="flex justify-between">
          <div className="h-3 w-10 rounded bg-muted" />
          <div className="h-3 w-10 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};
