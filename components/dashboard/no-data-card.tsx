import { Sparkles } from "lucide-react";

const NoDataFound = () => {
  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center rounded-xl border bg-background/60 backdrop-blur px-6 py-14 text-center space-y-3">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No quota data available</p>
      <p className="text-xs text-muted-foreground max-w-xs">
        We couldn't find any usage data for your account. Try again later.
      </p>
    </div>
  );
};

export default NoDataFound;
