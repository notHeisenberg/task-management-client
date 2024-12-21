import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export const ShinyButton = forwardRef(({ 
    children, 
    className, 
    icon, 
    onClick, 
    variant = 'default',
    size = 'default',
    ...props 
}, ref) => {
    const variants = {
        default: "border-2 bg-background hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
        primary: "bg-primary/90 text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary/90 text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-zinc-100/10 text-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800/20 border border-zinc-200/20 dark:border-zinc-800/20 backdrop-blur-sm",
        destructive: "bg-red-500/90 text-white hover:bg-red-500/80",
    };

    const sizes = {
        default: "h-16 w-16",
        sm: "h-10 w-10",
        lg: "h-20 w-20"
    };

    return (
        <button
            ref={ref}
            onClick={onClick}
            type="button"
            aria-label={children?.toString() || "Button"}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden",
                "transition-all duration-300 hover:scale-105 active:scale-95",
                "shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)]",
                "before:absolute before:inset-0 before:z-0",
                "before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]",
                "after:absolute after:inset-0 after:z-0",
                "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)]",
                "cursor-pointer rounded-xl",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            <div className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                {icon} {children}
            </div>
        </button>
    );
});

ShinyButton.displayName = 'ShinyButton';

ShinyButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'ghost', 'destructive']),
    size: PropTypes.oneOf(['default', 'sm', 'lg']),
}; 