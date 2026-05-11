import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlogCard } from '../blog/BlogCard';
import { PageIntro } from '../layout/PageIntro';
import { cardReveal, staggerContainer, titleReveal } from '../../lib/motion/motionPresets';

export const BlogIndexPage = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <Section className="pb-8 pt-32 md:pb-10 md:pt-36" eyebrow={siteContent.writing.index.eyebrow}>
      <PageIntro
        title="Latest"
        highlight="Articles."
        description={siteContent.writing.index.description}
        darkMode={darkMode}
        className="mb-10"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={staggerContainer(titleReveal.headingDelay, cardReveal.stagger)}
        initial="initial"
        whileInView="animate"
        viewport={cardReveal.viewport}
      >
        {siteContent.writing.items.map((post) => (
          <motion.div key={post.id} variants={cardReveal.variants({ reduceMotion })} className="h-full">
            <BlogCard post={post} onClick={onPostClick} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
