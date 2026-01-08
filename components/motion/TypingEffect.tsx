
'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypingEffectProps {
    text: string;
    className?: string;
    speed?: number; // duration per char sort of, but we use stagger in code normally. User snippet used stagger logic manually?
    // User snippet: 
    // {text.split('').map((letter, index) => <motion.span key={index} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2, delay: index*0.1}}>{letter}</motion.span>)}
}

export function TypingEffect({ text = 'Typing Effect', className }: TypingEffectProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <h2
            ref={ref}
            className={cn("font-black tracking-tighter", className)}
        >
            {text.split('').map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                    {letter}
                </motion.span>
            ))}
        </h2>
    );
}
