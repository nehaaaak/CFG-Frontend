"use client";

import { useQuota } from "@/hooks/use-quota";
import { QuotaCard } from "@/components/dashboard/quota-card";
import { QuotaCardSkeleton } from "@/components/dashboard/quota-card-skeleton";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useRouter } from "next/navigation";
import NoDataFound from "@/components/dashboard/no-data-card";
import {
  QUOTA_CONFIG,
  QUOTA_TOTAL,
  QuotaData,
} from "@/components/dashboard/constant";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { isAuthenticated } = useCurrentUser();
  const router = useRouter();

  if (!isAuthenticated) router.replace("/login");

  const { data, isLoading } = useQuota();
  const quota = data as QuotaData | undefined;

  const formattedResetDate = quota?.reset_date
    ? formatDate(quota.reset_date)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Quota</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your daily AI feature usage
          </p>
        </div>
        {formattedResetDate && (
          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Quota resets on
            </p>
            <p className="text-sm font-semibold mt-0.5">{formattedResetDate}</p>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <QuotaCardSkeleton key={i} />)
        ) : quota ? (
          QUOTA_CONFIG.map(({ key, title, icon }) => (
            <QuotaCard
              key={key}
              title={title}
              remaining={quota[key]}
              total={QUOTA_TOTAL}
              icon={icon}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}
