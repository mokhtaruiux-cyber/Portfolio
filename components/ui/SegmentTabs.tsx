
import React from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';

interface SegmentTabsProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
}

export const SegmentTabs: React.FC<SegmentTabsProps> = ({ tabs, activeTab, onChange }) => {
    const { darkMode } = useTheme();
    return (
        <div
          className={cn(
            "relative inline-flex max-w-full overflow-hidden rounded-panel border shadow-sm",
            darkMode ? "border-white/10" : "border-black/10"
          )}
        >
            <div
                className={cn(
                    "flex items-center gap-1 h-12 p-1 rounded-panel overflow-x-auto whitespace-nowrap no-scrollbar touch-scroll",
                    darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                )}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => onChange(tab)}
                            className={cn(
                                "relative h-10 px-4 sm:px-5 rounded-control whitespace-nowrap z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                typography.labelXs,
                                isActive
                                    ? "bg-accent text-white shadow-sm"
                                    : cn(
                                        "hover:bg-black/10 hover:text-black",
                                        typography.textSubtle,
                                        darkMode && "hover:bg-white/10 hover:text-white"
                                      )
                            )}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>
            <div className={cn(
                "pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r",
                darkMode ? "from-[#030303] to-transparent" : "from-[#fafafa] to-transparent"
            )} />
            <div className={cn(
                "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l",
                darkMode ? "from-[#030303] to-transparent" : "from-[#fafafa] to-transparent"
            )} />
        </div>
    );
};
