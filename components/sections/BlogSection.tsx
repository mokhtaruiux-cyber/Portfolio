'use client';

import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { BlogCard } from '../blog/BlogCard';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { cardReveal, titleReveal } from '../../lib/motion/motionPresets';
import {
  fadeUp,
} from '../../lib/motion/variants';

export const BlogSection = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();

  return (
    <Section id="blog" reveal={false}>
      {/*
        Flat: [eyebrow] [title] [body] [cards stagger]
        Each rises separately — premium waterfall effect.
      */}
      <AnimatedSection amount={0.1}>

        {/* 1 — Eyebrow */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}
        >
          {siteContent.writing.eyebrow}
        </motion.p>

        {/* 2 — Title */}
        <motion.div variants={fadeUp} className="mb-4">
          <BlurIn
            as="h2"
            delay={titleReveal.headingDelay}
            className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
          >
            {siteContent.writing.title}
            {siteContent.writing.highlight && (
              <>
                {' '}
                <span className="text-accent">{siteContent.writing.highlight}</span>
              </>
            )}
          </BlurIn>
        </motion.div>

        {/* 3 — Description */}
        <Reveal
          as="p"
          className={cn(typography.body, 'max-w-2xl font-medium mb-12', darkMode ? 'text-gray-300' : 'text-gray-600')}
        >
          {siteContent.writing.description}
        </Reveal>

        {/* 4 — Blog cards: stagger each card */}
        <Reveal
          preset="card"
          staggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {siteContent.writing.items.map((post) => (
            <motion.div key={post.id} variants={cardReveal.defaultVariants} className="h-full">
              <BlogCard post={post} onClick={onPostClick} />
            </motion.div>
          ))}
        </Reveal>
      </AnimatedSection>
    </Section>
  );
};
