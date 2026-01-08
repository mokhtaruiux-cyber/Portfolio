
import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10", className)}>
            {children}
        </div>
    );
};
