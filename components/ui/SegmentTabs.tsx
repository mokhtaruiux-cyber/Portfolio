
import React from 'react';
import { motion } from 'framer-motion';
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
        <div className="relative inline-flex max-w-full overflow-hidden">
            <div
                className={cn(
                    "flex items-center gap-1 h-11 p-1 rounded-[16px] border overflow-x-auto whitespace-nowrap no-scrollbar backdrop-blur-xl",
                    darkMode ? "bg-white/[0.06] border-white/10" : "bg-black/[0.04] border-black/10"
                )}
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => onChange(tab)}
                            className={cn(
                                "relative h-9 px-4 sm:px-5 rounded-[4px] transition-all duration-300 whitespace-nowrap z-10",
                                typography.labelXs,
                                isActive
                                    ? "text-white"
                                    : cn("hover:opacity-100", typography.textSubtle, darkMode ? "text-white" : "text-black")
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-[4px] border bg-[#2f6bff]/20 border-[#2f6bff]/30 -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
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
