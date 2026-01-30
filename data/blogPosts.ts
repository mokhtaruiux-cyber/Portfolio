import { BlogPost } from '../types';
import { assetPath } from '../lib/assetPath';

const stockImage = (fileName: string) => assetPath(`assets/images/${fileName}`);

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-social-media-is-reshaping-your-brain',
    title: 'How Social Media Is Reshaping Your Brain',
    excerpt:
      'Understanding the cost of constant digital distraction',
    category: 'Thought / Perspective',
    date: 'Jan 20, 2026',
    readTime: '5 min',
    coverImage: stockImage('Cover Image 1@1x.webp'),
    tags: ['Attention', 'Social Media', 'Focus'],
    contentBlocks: [
      { type: 'heading', text: 'Introduction' },
      {
        type: 'paragraph',
        text:
          'Scrolling through social media has become a reflex. We reach for our phones without thinking--during breaks, before sleep, even in moments meant for rest. While these platforms help us stay connected and informed, they are also carefully engineered to capture attention. Over time, this constant stimulation begins to shape how we think, focus, and feel. This article looks at how social media affects the brain, why it is so hard to look away, and how we can regain control without disconnecting completely.',
      },
      { type: 'heading', text: 'The Dopamine Loop' },
      {
        type: 'paragraph',
        text:
          'Every notification, like, or comment creates a small sense of reward. That brief rush feels harmless, but repeated endlessly, it trains the brain to seek constant stimulation. Instead of feeling satisfied, we start craving the next interaction.',
      },
      {
        type: 'paragraph',
        text:
          'Over time, everyday experiences--reading, conversations, quiet moments--can feel less engaging. Not because they are less meaningful, but because the brain has adapted to faster, louder rewards. This is how casual scrolling turns into habitual checking.',
      },
      {
        type: 'image',
        src: stockImage('Dopamine Loop 1@1x.webp'),
        alt: 'Dopamine loop illustration',
      },
      { type: 'heading', text: 'Fragmented Attention' },
      {
        type: 'paragraph',
        text:
          'Social platforms are built around short bursts of content: quick videos, rapid transitions, endless feeds. This trains the brain to switch attention constantly instead of sustaining it.',
      },
      {
        type: 'paragraph',
        text:
          'As a result, focusing on longer or more complex tasks becomes harder. Deep work feels uncomfortable. Silence feels boring. The mind becomes accustomed to interruption--and begins to expect it.',
      },
      {
        type: 'image',
        src: stockImage('Fragmented Attention 1@1x.webp'),
        alt: 'Fragmented attention illustration',
      },
      { type: 'heading', text: 'Emotional Impact' },
      {
        type: 'paragraph',
        text:
          "Social media often promises connection, yet it can quietly amplify comparison. Curated highlights from other people's lives create unrealistic standards and subtle pressure. When engagement drops, it's easy to internalize it as personal failure.",
      },
      {
        type: 'paragraph',
        text:
          'This cycle--anticipation, reward, and disappointment--can affect mood, confidence, and emotional stability. Over time, it may contribute to anxiety, low self-esteem, and a distorted sense of social connection.',
      },
      { type: 'heading', text: 'Reclaiming Your Attention' },
      {
        type: 'paragraph',
        text:
          "The goal isn't to quit social media entirely, but to use it with intention. Small changes can significantly reduce its cognitive and emotional impact:",
      },
      {
        type: 'list',
        items: [
          'Disable non-essential notifications and check platforms at intentional times.',
          'Take regular breaks from highly stimulating apps to reset attention patterns.',
          'Reintroduce deep-focus activities like reading, writing, or creative work.',
          'Prioritize real-world interactions that offer richer emotional feedback.',
          'Create phone-free moments, especially at the start and end of the day.',
        ],
      },
      {
        type: 'image',
        src: stockImage('Reclaiming Focus 1@1x.webp'),
        alt: 'Reclaiming focus illustration',
      },
      { type: 'heading', text: 'Conclusion' },
      {
        type: 'paragraph',
        text:
          "Social media isn't inherently harmful--but its design can quietly shape how we think, focus, and feel. Awareness is the first step. By setting boundaries and using digital tools more deliberately, we can enjoy connection without sacrificing clarity, focus, or mental well-being.",
      },
    ],
  },
  {
    id: '2',
    slug: 'analyze-usability-test-data-with-confidence',
    title: 'Analyze Usability Test Data with Confidence',
    excerpt:
      'A practical framework for turning observations into insights',
    category: 'Research',
    date: 'Jan 12, 2026',
    readTime: '8 min',
    coverImage: stockImage('Cover Image — Four-Step Framework@1x.webp'),
    tags: ['UX Research', 'Usability Testing', 'Insights'],
    contentBlocks: [
      { type: 'heading', text: 'Introduction' },
      {
        type: 'paragraph',
        text:
          'Usability testing shows you what users do--but real value comes from how you interpret what you see. Raw notes, recordings, and metrics do not improve products on their own. Insight does.',
      },
      {
        type: 'paragraph',
        text:
          'Analyzing usability test data is where research turns into direction. It is the step that transforms scattered observations into clear priorities and actionable decisions. This article introduces a simple, structured way to analyze usability data with confidence--without overcomplicating the process.',
      },
      { type: 'heading', text: 'Why Usability Data Is Hard to Analyze' },
      {
        type: 'paragraph',
        text:
          'Usability studies often generate mixed signals. Participants behave differently. Some struggle, others breeze through. Feedback can conflict with observed behavior. Add multiple flows, prototypes, or fidelity levels, and patterns become harder to spot.',
      },
      {
        type: 'paragraph',
        text:
          "Without a clear structure, it's easy to:",
      },
      {
        type: 'list',
        items: [
          'Overreact to individual comments',
          'Miss recurring issues',
          'Jump to solutions too early',
        ],
      },
      {
        type: 'paragraph',
        text:
          'A reliable framework helps you slow down, reduce noise, and focus on what actually matters.',
      },
      { type: 'heading', text: 'Step One -- Collect What Matters' },
      {
        type: 'paragraph',
        text:
          'Start by grounding your analysis in the research goals. Not everything observed during testing is equally important.',
      },
      {
        type: 'list',
        items: [
          'User behavior during key tasks',
          'Verbal feedback that explains intent or confusion',
          'Moments of hesitation, error, or workaround',
        ],
      },
      {
        type: 'paragraph',
        text:
          "Then filter aggressively. If a note or metric doesn't help answer your research questions, it's probably noise. Reducing the dataset early makes the next steps clearer and more effective.",
      },
      {
        type: 'image',
        src: stockImage('Collect & Assess@1x.webp'),
        alt: 'Collect and assess usability data',
      },
      { type: 'heading', text: 'Step Two -- Assess for Relevance' },
      {
        type: 'paragraph',
        text:
          "Once you've collected the right data, evaluate how well it supports your goals. Context matters.",
      },
      {
        type: 'paragraph',
        text:
          'Ask:',
      },
      {
        type: 'list',
        items: [
          'Does this observation relate to a core task?',
          'Could device, environment, or user background influence it?',
          'Is this a one-off or something that appears across sessions?',
        ],
      },
      {
        type: 'paragraph',
        text:
          'At this stage, organize notes by task, theme, or journey step. This prepares the data for synthesis and prevents isolated incidents from skewing conclusions.',
      },
      { type: 'heading', text: 'Step Three -- Explain the Behavior' },
      {
        type: 'paragraph',
        text:
          'This is where analysis becomes insight.',
      },
      {
        type: 'paragraph',
        text:
          'Look for patterns across users. Combine what people did with what they said to understand why behaviors occurred. Avoid focusing only on surface-level issues--dig into causes.',
      },
      {
        type: 'paragraph',
        text:
          'Strong explanations:',
      },
      {
        type: 'list',
        items: [
          'Connect behavior to design decisions',
          'Reveal breakdowns in clarity, feedback, or expectations',
          'Translate observations into opportunities for improvement',
        ],
      },
      {
        type: 'paragraph',
        text:
          "The goal isn't to list problems, but to tell a clear story that guides design decisions.",
      },
      {
        type: 'image',
        src: stockImage('Explain Behavior@1x.webp'),
        alt: 'Explaining behavior to reveal insights',
      },
      { type: 'heading', text: 'Step Four -- Validate the Fit' },
      {
        type: 'paragraph',
        text:
          'Before finalizing recommendations, pressure-test your conclusions.',
      },
      {
        type: 'paragraph',
        text:
          'Check that:',
      },
      {
        type: 'list',
        items: [
          'Insights are supported by multiple observations',
          "They aren't driven by outliers or assumptions",
          'Alternative explanations have been considered',
        ],
      },
      {
        type: 'paragraph',
        text:
          "If something doesn't fully align, revisit earlier steps. Refinement is part of good analysis. Once validated, package insights in a way stakeholders can understand--using clear narratives, supporting quotes, and visual summaries.",
      },
      {
        type: 'image',
        src: stockImage('Validate & Align@1x.webp'),
        alt: 'Validate and align insights',
      },
      { type: 'heading', text: 'Conclusion' },
      {
        type: 'paragraph',
        text:
          "Analyzing usability test data isn't about counting issues or summarizing feedback. It's about uncovering patterns, prioritizing real problems, and explaining user behavior in a way that drives better decisions.",
      },
      {
        type: 'paragraph',
        text:
          'With a structured approach, research becomes more than documentation--it becomes a tool for building more usable, thoughtful products.',
      },
    ],
  },
  {
    id: '3',
    slug: 'convenience-vs-probability-sampling',
    title: 'Convenience vs. Probability Sampling in UX Research',
    excerpt:
      'Choosing the right participants for UX research decisions that actually matter',
    category: 'Research',
    date: 'Jan 03, 2026',
    readTime: '7 min',
    coverImage: stockImage('Cover Image — Sampling Comparison@1x.webp'),
    tags: ['UX Research', 'Sampling', 'Research'],
    contentBlocks: [
      { type: 'heading', text: 'Introduction' },
      {
        type: 'paragraph',
        text:
          'Recruiting the right participants is one of the most critical decisions in UX research. The way you sample users directly affects how confident you can be in your findings, how quickly you can move, and how much trust stakeholders place in the results.',
      },
      {
        type: 'paragraph',
        text:
          'In practice, teams often balance between speed, cost, and accuracy. This usually leads to choosing between two common approaches: convenience sampling and probability sampling. Each serves a different purpose, and understanding when to use which one can save time, money, and prevent misleading conclusions.',
      },
      { type: 'heading', text: 'What Is Convenience Sampling?' },
      {
        type: 'paragraph',
        text:
          'Convenience sampling is a non-probability approach where participants are recruited because they are easy to reach. These might be existing customers, internal users, people from mailing lists, or anyone readily available at the time of the study.',
      },
      {
        type: 'paragraph',
        text:
          'Because participants are selected based on accessibility rather than randomness, this method prioritizes speed and practicality over representativeness. While inclusion criteria and quotas can help narrow the group, they do not eliminate bias entirely.',
      },
      {
        type: 'image',
        src: stockImage('Convenience Sampling@1x.webp'),
        alt: 'Convenience sampling illustration',
      },
      { type: 'heading', text: 'When Convenience Sampling Works Well' },
      {
        type: 'paragraph',
        text:
          'Convenience sampling is most effective during early or exploratory phases of design. It works well when the goal is to identify usability issues, uncover mental models, or validate interaction patterns quickly.',
      },
      {
        type: 'paragraph',
        text:
          'This approach is commonly used for:',
      },
      {
        type: 'list',
        items: [
          'Early usability testing',
          'Low-fidelity prototype feedback',
          'Design sprints and rapid iteration cycles',
        ],
      },
      {
        type: 'paragraph',
        text:
          'At this stage, discovering problems is often more valuable than measuring how widespread they are.',
      },
      { type: 'heading', text: 'What Is Probability Sampling?' },
      {
        type: 'paragraph',
        text:
          'Probability sampling includes methods where every user in the target population has a known chance of being selected. Participants are chosen randomly or through structured techniques that aim to represent the broader user base.',
      },
      {
        type: 'paragraph',
        text:
          'Because selection is systematic and unbiased, probability sampling allows researchers to generalize findings and make population-level claims with greater confidence. This makes it especially valuable for quantitative studies and high-impact decisions.',
      },
      {
        type: 'image',
        src: stockImage('Probability Sampling@1x.webp'),
        alt: 'Probability sampling illustration',
      },
      { type: 'heading', text: 'When Probability Sampling Is the Better Choice' },
      {
        type: 'paragraph',
        text:
          'Probability sampling is most appropriate when research outcomes influence strategic decisions.',
      },
      {
        type: 'paragraph',
        text:
          'It is commonly used for:',
      },
      {
        type: 'list',
        items: [
          'Surveys and benchmarking',
          'A/B testing at scale',
          'Measuring prevalence or comparing segments',
        ],
      },
      {
        type: 'paragraph',
        text:
          'While this approach requires more time, planning, and resources, it reduces bias and increases confidence when results must reflect the entire user population.',
      },
      { type: 'heading', text: 'Choosing the Right Fit' },
      {
        type: 'paragraph',
        text:
          'The choice between convenience and probability sampling should always be driven by research goals--not habit.',
      },
      {
        type: 'paragraph',
        text:
          'If you are exploring problems, testing ideas, or working under tight timelines, convenience sampling helps you move fast and learn early. If you are validating assumptions, measuring impact, or supporting high-stakes decisions, probability sampling provides the rigor needed to trust the results.',
      },
      {
        type: 'paragraph',
        text:
          'In many teams, the most effective approach is a hybrid one: starting with convenience sampling to explore and iterate, then moving to probability sampling to validate and scale insights.',
      },
      {
        type: 'image',
        src: stockImage('Choosing the Right Fit@1x.webp'),
        alt: 'Choosing the right sampling approach',
      },
      { type: 'heading', text: 'Conclusion' },
      {
        type: 'paragraph',
        text:
          'Sampling is not a technical detail--it defines the strength of your research conclusions. Convenience sampling accelerates learning but sacrifices representativeness. Probability sampling improves accuracy and confidence but requires more investment.',
      },
      {
        type: 'paragraph',
        text:
          'By choosing the right method at the right time--or combining both thoughtfully--you can make UX research faster, more reliable, and more impactful for product decisions.',
      },
    ],
  },
];
