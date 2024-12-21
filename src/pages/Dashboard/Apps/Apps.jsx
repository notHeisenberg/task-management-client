import {  useRef, forwardRef } from 'react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import PropTypes from 'prop-types';


const ShinyButton = forwardRef(({ children, className, icon, onClick }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            type="button"
            aria-label={children?.toString() || "Button"}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-full border-2 bg-background",
                "h-16 w-16",
                "transition-all duration-300 hover:scale-105 active:scale-95",
                "shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                "before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]",
                "cursor-pointer",
                className
            )}
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
};



// Icons object
const Icons = {
    terminal: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 17l6-6-6-6M12 19h8" />
        </svg>
    ),
    calculator: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
    ),
    whiteboard: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
        </svg>
    ),
    user: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    back: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
    ),
};

const Apps = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef(null);
    const userRef = useRef(null);
    const terminalRef = useRef(null);
    const calculatorRef = useRef(null);
    const whiteboardRef = useRef(null);

    const isAppView = location.pathname !== '/dashboard/apps';

    const apps = [
        {
            id: 'terminal',
            ref: terminalRef,
            icon: <Icons.terminal />
        },
        {
            id: 'calculator',
            ref: calculatorRef,
            icon: <Icons.calculator />
        },
        {
            id: 'whiteboard',
            ref: whiteboardRef,
            icon: <Icons.whiteboard />
        }
    ];

    if (isAppView) {
        return (
            <div className="relative h-[calc(100vh-65px)] w-full">
                <DotPattern
                    width={16}
                    height={16}
                    cx={1}
                    cy={1}
                    cr={1}
                    className="absolute inset-0 opacity-30"
                />

                <div className="relative h-full w-full z-10">
                    <Outlet />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative flex h-[calc(100vh-65px)] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10"
        >
            <DotPattern
                width={16}
                height={16}
                cx={1}
                cy={1}
                cr={1}
                className="absolute inset-0 opacity-30"
            />

            <div className="relative z-10 flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center">
                    <ShinyButton
                        ref={userRef}
                        icon={<Icons.user />}
                        className="h-16 w-16"
                    />
                </div>

                <div className="flex flex-col justify-center gap-4">
                    {apps.map(({ id, ref, icon }) => (
                        <ShinyButton
                            key={id}
                            ref={ref}
                            icon={icon}
                            onClick={() => navigate(`/dashboard/apps/${id}`)}
                            className="h-16 w-16"
                        />
                    ))}
                </div>
            </div>

            {/* AnimatedBeams */}
            {apps.map(({ id, ref }) => (
                <AnimatedBeam
                    key={id}
                    containerRef={containerRef}
                    fromRef={userRef}
                    toRef={ref}
                    duration={3}
                    delay={0}
                    pathWidth={2}
                    pathColor="#E5E7EB"
                    dashWidth={12}
                    dashLength={24}
                    gradient={true}
                    gradientStartColor="#ff40bf"
                    gradientStopColor="#9c40ff"
                />
            ))}
        </div>
    );
};

export default Apps;