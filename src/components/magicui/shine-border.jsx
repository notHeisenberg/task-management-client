"use client";

import { cn } from "@/lib/utils";

export const ShineBorder = ({
  children,
  className,
  duration = 4,
  colors = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  borderWidth = "2px",
  ...props
}) => {
  const gradientColors = Array.isArray(colors) ? colors.join(", ") : colors;

  return (
    <div
      className={cn(
        "relative rounded-lg p-[2px] overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,var(--shine-color)_10%,transparent_40%)]",
        "before:animate-[spin_var(--duration)_linear_infinite]",
        className
      )}
      style={{
        '--shine-color': `linear-gradient(to right, ${gradientColors})`,
        '--duration': `${duration}s`,
      }}
      {...props}
    >
      <div className="relative h-full w-full rounded-[inherit] bg-white">
        {children}
      </div>
    </div>
  );
};

export default ShineBorder; 