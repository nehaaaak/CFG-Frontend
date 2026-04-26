import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type TooltipWrapperProps = {
  children: React.ReactNode;
  tooltip?: string;
  showTooltip?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
};

const TooltipWrapper = ({
  children,
  tooltip,
  showTooltip = true,
  side = "bottom",
  delayDuration = 200,
}: TooltipWrapperProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {showTooltip && tooltip && (
          <TooltipContent side={side}>
            <p className="text-xs">{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
