"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MagicCard = React.forwardRef(({
  as: Component = "div",
  className,
  children,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.3,
  gradientTransparency = 80,
  ...props
}, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const [borderRadius, setBorderRadius] = React.useState("0px");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setBorderRadius("0.5rem");
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setBorderRadius("0px");
  };

  return (
    <Component
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}${Math.round(gradientTransparency).toString(16)}, transparent ${gradientOpacity})`,
          borderRadius
        }}
      />
      {children}
    </Component>
  );
});

MagicCard.displayName = "MagicCard";

export { MagicCard }; 