"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ShineBorder = React.forwardRef(({
  children,
  className,
  duration = 14,
  color = "#FFFFFF",
  borderRadius = 8,
  borderWidth = 1,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg p-[1px] overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,var(--shine-color)_10%,transparent_40%)]",
        "before:animate-[spin_var(--duration)_linear_infinite]",
        className
      )}
      style={{
        '--shine-color': color,
        '--duration': `${duration}s`,
        borderRadius: `${borderRadius}px`,
      }}
      {...props}
    >
      <div
        className="relative h-full w-full rounded-[inherit] bg-white"
        style={{ padding: `${borderWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
});

ShineBorder.displayName = "ShineBorder";

export { ShineBorder }; 