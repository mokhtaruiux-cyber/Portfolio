import { Project } from '../types';
import { assetPath } from '../lib/assetPath';

const stockImage = (fileName: string) => assetPath(`assets/images/${fileName}`);

export const projects: Project[] = [
  {
    id: '13',
    slug: 'shipo-inventory-shipping',
    title: 'Shipo Inventory & Shipping',
    category: 'Dashboards',
    type: 'Product Design Case Study',
    industry: 'E-commerce Operations',
    platform: 'Web Dashboard - iOS Warehouse App',
    year: '2026',
    role: 'Product Designer',
    tools: ['Figma', 'Design System', 'Prototyping'],
    coverGradient: 'from-blue-600/20 to-slate-900/20',
    description:
      'A web dashboard for SKUs, orders and shipments for small Saudi online shops on Salla and Zid, plus a warehouse app that scans, receives, counts and dispatches.',
    impact: 'Designed one calm system that puts stock, orders and shipping labels on a single screen for the owner, with a thumb-friendly app for the warehouse.',
    image: stockImage('projects/shipo/cover.webp'),
    tags: ['Product Design', 'Inventory', 'Web + Mobile'],
    metrics: [
      { label: 'Desktop Screens', value: '28' },
      { label: 'Mobile Screens', value: '7' },
      { label: 'Components', value: '14' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/shipo/01-hero.webp'),
        alt: 'Shipo case study hero with web dashboard and warehouse app',
        caption: 'Case study hero — Inventory and shipping for small Saudi shops: a web dashboard for SKUs, orders and shipments for sellers on Salla and Zid, plus a warehouse app that scans, receives, counts and dispatches.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/02-overview.webp'),
        alt: 'Shipo overview of the problem and the audience',
        caption: 'Overview — One place for stock, orders and shipments. Small online sellers juggle spreadsheets and three carrier portals, so Shipo puts the SKU list, the orders and the shipping labels on one screen.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/03-users-market.webp'),
        alt: 'Shipo proto-personas for the owner and the warehouse user',
        caption: 'Users and market — Two people, two very different moments. Proto-personas built from desk research and assumptions, meant to be validated in interviews rather than quoted as findings.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/04-goals-rules.webp'),
        alt: 'Shipo design goals and interface rules',
        caption: 'Goals and design rules — Four targets to test and four rules to keep. Targets are what a usability test would measure, and the rules kept every screen calm and easy to scan.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/05-flows.webp'),
        alt: 'Shipo information architecture and core flows',
        caption: 'Flows — Five areas and three flows designed first. The web app has five areas, and the phone app holds the jobs done standing up, so those flows came before any dashboard.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/06-design-system.webp'),
        alt: 'Shipo design system with color, type and components',
        caption: 'Design system — A soft ledger look with one loud color. Light canvas, white cards and one blue for the primary action, with orange, green and red reserved for low, delivered and failed.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/07-key-decisions.webp'),
        alt: 'Shipo key design decisions',
        caption: 'Key decisions — Three decisions that shaped the interface. Each started with a problem in the first pass and ended with a rule that can be checked on every screen.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/08-overview-products.webp'),
        alt: 'Shipo web overview and products screens',
        caption: 'Overview and products — Stock you can trust at a glance. The overview opens with what needs attention, and products show stock per location with import, adjust and reorder close by.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/09-orders-shipments.webp'),
        alt: 'Shipo orders and shipments screens',
        caption: 'Orders and shipments — From a new order to a printed label. Orders arrive from Salla and Zid or are added by hand, and creating a shipment reuses the order data so nothing is typed twice.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/10-setup-team-settings.webp'),
        alt: 'Shipo sign-up, team and settings screens',
        caption: 'Setup, team and settings — Getting started and running a team. Sign-up asks two things, a checklist leads to the first product, and two roles decide who sees what.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/11-warehouse-app.webp'),
        alt: 'Shipo iOS warehouse app screens',
        caption: 'Warehouse app — Built for hands that are full. One big button per step, large numbers and a clear confirmation, so scan, receive, count, pick and dispatch fit one thumb.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/12-states-edge-cases.webp'),
        alt: 'Shipo empty, error and loading states',
        caption: 'States and edge cases — Empty, failed and confirmed are designed too. Every list has an empty state, every action has feedback, and failures say what happened and what to do next.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/13-iteration.webp'),
        alt: 'Shipo design iteration after self-audit',
        caption: 'Iteration — What changed after auditing my own work. The first version looked like a concept, and six changes made the biggest difference.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/14-outcome.webp'),
        alt: 'Shipo outcome, learnings and next steps',
        caption: 'Outcome — What I got, what I learned and what comes next. The goals are targets set for the design and have not been measured with real users yet.',
      },
      {
        type: 'image',
        src: stockImage('projects/shipo/15-closing.webp'),
        alt: 'Shipo closing slide',
        caption: 'Closing — Shipo is a concept for small Saudi online sellers: stock, orders and shipments on the web, and a warehouse app that scans, counts and picks.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Small online sellers in Saudi Arabia juggle spreadsheets and three carrier portals, so nobody sees a low SKU until a customer asks and labels are typed more than once.',
      },
      {
        title: 'Process',
        content:
          'I built proto-personas from desk research, set four testable goals and four design rules, mapped five web areas, and designed the standing-up warehouse flows before any dashboard screen.',
      },
      {
        title: 'Solution',
        content:
          'A soft ledger web dashboard with one primary blue and reserved status colors for stock, orders and shipments, plus a warehouse app where scan, receive, count, pick and dispatch fit one thumb.',
      },
      {
        title: 'Results',
        content:
          'A complete concept of 28 desktop screens, 7 mobile screens and 14 components, with goals defined as targets to validate in usability testing rather than measured results.',
      },
    ],
  },
  {
    id: '14',
    slug: 'wayloom-trip-planner',
    title: 'Wayloom Trip Planner',
    category: 'Mobile Apps',
    type: 'Product Design Case Study',
    industry: 'Travel',
    platform: 'Mobile App - Arabic RTL',
    year: '2026',
    role: 'Product Designer',
    tools: ['Figma', 'Design System', 'Prototyping'],
    coverGradient: 'from-teal-600/20 to-emerald-900/20',
    description:
      'A mobile trip planner designed in Arabic, where travelers create a trip, plan each day, save stays and transport, keep a shared budget and invite friends.',
    impact: 'Designed an Arabic-first planning flow that replaces five apps and a group chat with one calm place for the itinerary, bookings and shared budget.',
    image: stockImage('projects/wayloom/cover.webp'),
    tags: ['Product Design', 'Arabic RTL', 'Travel App'],
    metrics: [
      { label: 'Screens Designed', value: '76' },
      { label: 'User Flows', value: '7' },
      { label: 'Main Tabs', value: '5' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/wayloom/01-hero.webp'),
        alt: 'Wayloom case study hero with Arabic trip planner screens',
        caption: 'Case study hero — A trip planner designed in Arabic: from reading the brief to a clickable prototype, create a trip, plan each day, save stays and transport, keep a shared budget and invite friends.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/02-overview.webp'),
        alt: 'Wayloom overview of the brief and the problem',
        caption: 'Overview — One app for the whole trip. People plan trips across five apps and a group chat, and the spec listed 77 screens and states from sign-up to a shared budget.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/03-persona-promises.webp'),
        alt: 'Wayloom persona and design promises',
        caption: 'Persona and promises — Meet Sara and three promises. A proto-persona built from desk research guides every flow, starting with the whole plan in one place.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/04-process-structure.webp'),
        alt: 'Wayloom design process and app structure',
        caption: 'Process and structure — Seven flows on a five-tab structure. I audited the brief, the palette and 77 screen specs, built the kit first, then designed page by page with a review after each page.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/05-design-system.webp'),
        alt: 'Wayloom design system with color, type and components',
        caption: 'Design system — Lagoon glass: teal, sand and a little coral. Soft gradients, white cards, one teal for the primary action and rounded squares everywhere, with one family for Arabic and Latin numbers.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/06-finding-the-look.webp'),
        alt: 'Wayloom visual exploration from first pass to final look',
        caption: 'Finding the look — From gray boxes to a coastal feel. The first pass was flat cards and gray placeholders, and photos, glass and one shape language gave the app its mood.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/07-onboarding-discovery.webp'),
        alt: 'Wayloom onboarding and discovery screens',
        caption: 'Onboarding and discovery — Home answers one question: where next? The first run sells the trip before asking for anything, then home leads with places, not menus.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/08-creating-a-trip.webp'),
        alt: 'Wayloom create trip flow screens',
        caption: 'Creating a trip — Six short steps to a planned trip. Each screen asks one thing: where, when, who, what you like and how much, with a step bar showing what is left.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/09-itinerary-stays-budget.webp'),
        alt: 'Wayloom itinerary, stays and budget screens',
        caption: 'Itinerary, stays and budget — Plan the days, then see what it costs. Days are tabs, stays and transport sit one tap away, and the budget keeps a running total in riyals.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/10-sharing-today-profile.webp'),
        alt: 'Wayloom sharing, Today and profile screens',
        caption: 'Sharing, Today and profile — Planning together, then using the plan on the trip. Invite by link, give each person a role, and on the day open Today to see only what is next.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/11-sheets-dialogs-states.webp'),
        alt: 'Wayloom sheets, dialogs and state screens',
        caption: 'Sheets, dialogs and states — Overlays that ask before they act. Pickers rise from the bottom, risky actions get a dialog, and every state has its own screen.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/12-rtl-and-money.webp'),
        alt: 'Wayloom right-to-left and currency details',
        caption: 'Right to left and money — Details that make it feel native. Arabic is not a mirrored English app, so reading order, back arrows, numbers and the riyal glyph all follow the language.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/13-all-screens.webp'),
        alt: 'Wayloom overview of all 76 screens',
        caption: 'All screens — All 76 screens in one view. Seventy-six of the 77 specified screens are designed with their states, from the splash screen to the offline banner.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/14-outcome.webp'),
        alt: 'Wayloom outcome and next steps',
        caption: 'Outcome — A complete Arabic-first trip planner, designed end to end and ready for usability testing, with flows wired as a prototype and trip creation as the first test.',
      },
      {
        type: 'image',
        src: stockImage('projects/wayloom/15-closing.webp'),
        alt: 'Wayloom closing slide',
        caption: 'Closing — Wayloom is a concept for planning trips in Arabic: one place for the itinerary, stays, transport, a shared budget and friends.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'People plan trips across five apps and a group chat, so the itinerary, stays, transport and shared budget never live in one place.',
      },
      {
        title: 'Process',
        content:
          'I audited the brief, the palette and 77 screen specs, mapped seven flows on a five-tab structure, built the design kit first, and designed page by page with a review after each page.',
      },
      {
        title: 'Solution',
        content:
          'A lagoon-glass mobile app in Arabic with destination-led discovery, a six-step trip builder, day-by-day itinerary, stays and transport, a running riyal budget and link-based sharing with roles.',
      },
      {
        title: 'Results',
        content:
          'A complete Arabic-first concept with 76 of 77 specified screens and their states, wired as a clickable prototype and ready for usability testing on trip creation.',
      },
    ],
  },
  {
    id: '15',
    slug: 'khazna-banking-app',
    title: 'Khazna Banking App',
    category: 'Mobile Apps',
    type: 'Product Design Case Study',
    industry: 'Fintech',
    platform: 'Mobile App - Saudi Arabia',
    year: '2026',
    role: 'Product Designer',
    tools: ['Figma', 'Design System', '3D Illustration'],
    coverGradient: 'from-indigo-600/20 to-lime-400/20',
    description:
      'A complete mobile banking product for Saudi Arabia with Nafath onboarding, Sarie transfers, SADAD bills, savings and Sharia-compliant financing in one app that explains every riyal.',
    impact: 'Designed a calm banking experience where every fee, profit figure and limit is understandable before a user commits, across 120 screens and one design system.',
    image: stockImage('projects/khazna/cover.webp'),
    tags: ['Fintech', 'Mobile App', 'Design System'],
    metrics: [
      { label: 'Screens', value: '120' },
      { label: '3D Scenes', value: '16' },
      { label: 'Modules', value: '13' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/khazna/01-hero.webp'),
        alt: 'Khazna case study hero with mobile banking screens and 3D wallet illustration',
        caption: 'Case study hero — Banking that explains every riyal. A complete mobile banking product for Saudi Arabia with 120 screens, one design system and a 3D illustration kit.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/02-overview.webp'),
        alt: 'Khazna overview of the banking brief',
        caption: 'Overview — A calmer way to bank in Saudi Arabia. Open an account with Nafath, send with Sarie, pay SADAD bills, save and finance in a Sharia-compliant way, all in one app that explains every riyal.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/03-principles.webp'),
        alt: 'Khazna design principles',
        caption: 'Principles — Four rules behind every screen. Every decision traces back to one of them, which keeps 120 screens feeling like one calm product.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/04-design-system.webp'),
        alt: 'Khazna design system with color, type and components',
        caption: 'Design system — Two brand colors, one typeface, one shape language and one background pattern. Indigo carries the product, lime carries the action, and everything else is built from components.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/05-illustration-kit.webp'),
        alt: 'Khazna 3D illustration kit',
        caption: 'Illustration kit — 3D scenes that carry the brand. Sixteen pedestal scenes in silver, periwinkle, cobalt and lime replace generic icons on intros, success states and empty areas.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/06-onboarding.webp'),
        alt: 'Khazna onboarding screens',
        caption: 'Module A — Onboarding — Language, intros, Nafath identity, financial profile, passcode, Face ID and a ready account with IBAN across 17 screens, opening with a splash that feels like a promise.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/07-home-accounts.webp'),
        alt: 'Khazna home and accounts screens',
        caption: 'Modules B and C — Home and accounts — A balance-first home, a quiet service grid and clear accounts with IBAN, statements and certificates.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/08-cards-transfers.webp'),
        alt: 'Khazna cards and transfers screens',
        caption: 'Modules D and E — Cards and transfers — Card controls, limits and replacement, plus Sarie, QR, Qattah and international transfers with honest status.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/09-bills-activity-insights.webp'),
        alt: 'Khazna bills, activity and insights screens',
        caption: 'Modules F, G and H — Bills, activity and insights — SADAD and government bills, searchable transactions with receipts and disputes, and budgets that explain themselves.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/10-savings-rewards-financing.webp'),
        alt: 'Khazna savings, rewards and financing screens',
        caption: 'Modules I, J and K — Savings, rewards and financing — Goals with auto-save rules, cashback and points, and Sharia-compliant Murabaha financing with consent in plain words.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/11-profile-system.webp'),
        alt: 'Khazna profile, settings and system state screens',
        caption: 'Modules L and M — Profile and system — Profile, security and language settings, plus the offline, empty and error states most designs forget.',
      },
      {
        type: 'image',
        src: stockImage('projects/khazna/12-closing.webp'),
        alt: 'Khazna closing slide',
        caption: 'Closing — Khazna, designed to feel calm. 120 screens, one design system, 16 3D scenes and one background pattern for a Saudi banking app that explains every riyal.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Most banking apps show numbers and hide the reasoning, so users commit to fees, profit figures and limits they do not fully understand.',
      },
      {
        title: 'Process',
        content:
          'I set four principles, built one design system with two brand colors, one typeface and one shape language, created a 3D illustration kit, then designed the product module by module from onboarding to system states.',
      },
      {
        title: 'Solution',
        content:
          'A quiet, balance-first mobile app with Nafath onboarding, card controls, Sarie and international transfers, SADAD bills, savings goals, rewards and Sharia-compliant Murabaha financing explained in plain words.',
      },
      {
        title: 'Results',
        content:
          'A complete banking concept of 120 screens across 13 modules, with one design system and 16 3D scenes, ready for usability testing.',
      },
    ],
  },
  {
    id: '1',
    slug: 'nodel-restaurant-system',
    title: 'Nodel Restaurant App',
    category: 'Mobile Apps',
    type: 'B2B Product',
    industry: 'Hospitality',
    platform: 'Web - Mobile',
    year: '2023',
    role: 'Lead Product Designer',
    tools: ['Figma', 'React Native', 'Node.js'],
    coverGradient: 'from-orange-500/20 to-red-500/20',
    description:
      'A comprehensive smart solution designed to streamline restaurant operations, from order management to high-end customer engagement. Built with performance and scalability in mind.',
    impact: 'Cut order friction and improved on-premise efficiency across peak hours.',
    image: stockImage('Nodel@4x.webp'),
    tags: ['Product Design', 'Hospitality', 'SAAS'],
    metrics: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Satisfaction', value: '4.9' },
      { label: 'Error Rate', value: '-25%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('Nodel@4x.webp'),
        alt: 'Restaurant operations overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1517248135467-4c7edcad34c4.jpg'),
        alt: 'Service flow snapshot',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1559339352-11d035aa65de.jpg'),
        alt: 'NODEL product walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Restaurant teams were juggling disconnected POS, inventory, and kitchen display tools, causing delays and inconsistent guest experiences.',
      },
      {
        title: 'Process',
        content:
          'We audited peak-hour workflows, mapped bottlenecks, and prototyped faster order entry flows with real kitchen staff.',
      },
      {
        title: 'Solution',
        content:
          'A unified system that syncs orders, inventory, and kitchen status in real time with a streamlined staff interface.',
      },
      {
        title: 'Results',
        content:
          'Order placement time dropped dramatically while accuracy and guest satisfaction scores climbed across pilot locations.',
      },
    ],
  },
  {
    id: '2',
    slug: 'homecare-medical-app',
    title: 'Home Care App',
    category: 'Mobile Apps',
    type: 'Healthcare App',
    industry: 'Healthcare',
    platform: 'iOS - Android',
    year: '2022',
    role: 'Product Designer',
    tools: ['Swift', 'Figma', 'After Effects'],
    coverGradient: 'from-emerald-500/20 to-teal-500/20',
    description:
      'Connecting patients with caregivers through a seamless mobile interface with real-time health monitoring.',
    impact: 'Improved care coordination and patient transparency across visits.',
    image: stockImage('Home Care@4x.webp'),
    tags: ['Healthcare', 'Mobile', 'Design System'],
    metrics: [
      { label: 'Active Users', value: '10k+' },
      { label: 'Care Quality', value: '4.8' },
      { label: 'Retention', value: '85%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('Home Care Presentation@1x.webp'),
        alt: 'Home Care presentation hero',
      },
      {
        type: 'image',
        src: stockImage('Home Care Presentation@1x.webp'),
        alt: 'Home Care presentation section',
      },
      {
        type: 'image',
        src: stockImage('Home Care Presentation@1x.webp'),
        alt: 'Home Care presentation closing',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Patients struggled to coordinate care visits and track progress across multiple providers.',
      },
      {
        title: 'Process',
        content:
          'We interviewed patients and caregivers, then prototyped a simplified scheduling and tracking flow.',
      },
      {
        title: 'Solution',
        content:
          'A mobile companion that centralizes visits, notes, and real-time health updates.',
      },
      {
        title: 'Results',
        content:
          'Care teams reported faster coordination and patients felt more in control of their recovery.',
      },
    ],
  },
  {
    id: '9',
    slug: 'dawwem-hr-platform',
    title: 'Dawwem HR System',
    category: 'Vibe Coding',
    type: 'Saudi Workforce Platform',
    industry: 'Human Resources',
    platform: 'Web Dashboard - Mobile App',
    year: '2026',
    role: 'Product Lead & AI-Assisted Builder',
    tools: ['React', 'TypeScript', 'Node.js', 'Prisma', 'Playwright', 'AI-Assisted Development'],
    coverGradient: 'from-sky-500/20 to-blue-500/20',
    description:
      'An Arabic-first workforce platform for Saudi companies, connecting attendance, employee records, leave, approvals, payroll, compliance, performance, reporting, and employee mobile workflows.',
    impact: 'Turned a broad HR product vision into a live, role-based web and mobile platform with Saudi-ready operations and bilingual delivery.',
    image: stockImage('projects/dawwem/cover.webp'),
    livePreviewUrl: 'https://dawwemhrsystemdemo.vercel.app/',
    tags: ['Saudi HR Tech', 'Arabic-first', 'Web + Mobile'],
    metrics: [
      { label: 'Product Suites', value: '4' },
      { label: 'Languages', value: 'AR + EN' },
      { label: 'Experience', value: 'Web + Mobile' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/dawwem/dashboard-live.png'),
        alt: 'Dawwem live Arabic administration dashboard',
        caption: 'Administration dashboard — Gives leaders one view of daily priorities, approvals, payroll, compliance alerts, and shortcuts for recurring operations.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/employees.png'),
        alt: 'Dawwem active Arabic employee directory',
        caption: 'Employee management — Brings employee records, departments, status, and contact details into a searchable directory governed by user permissions.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/attendance.png'),
        alt: 'Dawwem active Arabic attendance overview',
        caption: 'Attendance overview — Shows attendance, lateness, and absence in real time with branch location, clock-in time, review, and correction actions.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/attendance-live.png'),
        alt: 'Dawwem active Arabic live attendance board',
        caption: 'Live attendance board — Helps HR teams and managers see who is present, late, or missing a check-in without waiting for an end-of-day report.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/payroll.png'),
        alt: 'Dawwem active Arabic payroll operations',
        caption: 'Payroll operations — Connects payroll runs to attendance, allowances, and deductions with a clear review and approval path before payment.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/recruitment.png'),
        alt: 'Dawwem active Arabic recruitment workspace',
        caption: 'Recruitment workspace — Organizes vacancies, candidates, interviews, and offers in one pipeline so accepted candidates move smoothly into onboarding.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/performance.png'),
        alt: 'Dawwem active Arabic performance management',
        caption: 'Performance management — Unifies goals, review cycles, and feedback in a structured experience that keeps development and decisions visible to managers and employees.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/analytics.png'),
        alt: 'Dawwem active Arabic workforce analytics',
        caption: 'Workforce analytics — Turns people data into readable indicators that help business owners track trends and make better operating decisions.',
      },
      {
        type: 'image',
        src: stockImage('projects/dawwem/mobile-home-live.png'),
        alt: 'Dawwem live Arabic employee mobile home screen',
        caption: 'Employee mobile experience — Puts clock-in, leave balances, payslips, expenses, and everyday requests in one focused mobile workspace.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Saudi companies needed one source of truth for attendance, employee records, leave, approvals, payroll, compliance, and workforce reporting across office, field, and mobile teams.',
      },
      {
        title: 'Process',
        content:
          'I led the product structure across four suites, mapped role and permission boundaries, aligned Arabic and English journeys, and used AI-assisted development with browser-based validation to turn the system into a working full-stack product.',
      },
      {
        title: 'Solution',
        content:
          'A role-based web dashboard and employee-first mobile experience covering attendance and GPS clock-ins, HR records, leave, approvals, payroll, expenses, recruitment, compliance, performance, analytics, and operational reporting.',
      },
      {
        title: 'Results',
        content:
          'Dawwem now presents a coherent Saudi workforce platform rather than isolated HR screens, with a live bilingual product story and connected operational surfaces for employees, managers, HR teams, and executives.',
      },
    ],
  },
  {
    id: '11',
    slug: 'restuhub-restaurant-platform',
    title: 'RestuHub',
    category: 'Vibe Coding',
    type: 'Restaurant Operations Platform',
    industry: 'Hospitality',
    platform: 'Web - Mobile - QR',
    year: '2026',
    role: 'Product Lead & AI-Assisted Builder',
    tools: ['Next.js', 'TypeScript', 'Prisma', 'Playwright', 'AI-Assisted Development'],
    coverGradient: 'from-orange-500/20 to-amber-500/20',
    description:
      'A multi-role restaurant operating system connecting menus, QR ordering, front-of-house service, kitchen production, pickup, payments, inventory, and reporting in one working product.',
    impact: 'Turned a broad restaurant product vision into a testable platform with role-specific workflows and real end-to-end order journeys.',
    image: stockImage('projects/restuhub/cover.webp'),
    livePreviewUrl: 'https://www.restuhub.top/en/landing',
    tags: ['Restaurant SaaS', 'Multi-role Platform', 'AI-Assisted Build'],
    metrics: [
      { label: 'Personas', value: '10' },
      { label: 'Experience', value: 'Web + QR' },
      { label: 'Coverage', value: 'End-to-end' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/restuhub/order-history.png'),
        alt: 'RestuHub owner order history dashboard with live operational data',
        caption: 'Operations overview — Owners can review live and historical orders, filter by status or date, and track revenue, active orders, VAT, and service charges from one workspace.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/qr-ordering.png'),
        alt: 'RestuHub mobile QR dining and shared ordering experience',
        caption: 'QR guest journey — Diners can join a table session, order together or solo, call a waiter, follow orders, and manage rewards without downloading an app.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/orders.png'),
        alt: 'RestuHub cashier order operations workspace',
        caption: 'Order operations — Cashiers can open the till, search and filter unresolved orders, review channel and status, and hand each order through the service lifecycle with a clear operational view.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/mobile-showcase.webp'),
        alt: 'RestuHub guest experience presented in iPhone mockups',
        caption: 'Mobile guest experience — The current responsive ordering interface is presented in-device to show its real scale, hierarchy, and touch-first interaction model.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/waiter.png'),
        alt: 'RestuHub waiter workspace',
        caption: 'Waiter workspace — Floor staff can monitor tables, create and follow orders, respond to guest requests, and keep service moving during busy shifts.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/cashier.png'),
        alt: 'RestuHub cashier workspace',
        caption: 'Cashier workspace — The till-focused experience supports order review, payment handling, shift controls, and handoff to the kitchen without exposing irrelevant admin tools.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/kitchen.png'),
        alt: 'RestuHub kitchen production workspace',
        caption: 'Kitchen production — Orders become prioritized preparation tickets so kitchen staff can move each item from received to preparing and ready with less verbal coordination.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/pickup.png'),
        alt: 'RestuHub pickup and dispatch workspace',
        caption: 'Pickup and dispatch — Ready orders are organized for collection and handoff, closing the operational loop between kitchen, pickup staff, and the guest.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/support.png'),
        alt: 'RestuHub support operations workspace',
        caption: 'Support operations — Support agents can locate real orders, review tickets and ratings, and help guests without entering owner-only restaurant settings.',
      },
      {
        type: 'image',
        src: stockImage('projects/restuhub/admin-commerce.png'),
        alt: 'RestuHub owner commerce and guest controls',
        caption: 'Commerce and guest management — Owners can configure promotions, delivery zones, recommendations, reservations, reviews, and customer-facing offers from the same platform.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content: 'Restaurant teams were forced to coordinate menus, table service, kitchen production, payments, pickup, staff, and reporting across disconnected tools and handoffs.',
      },
      {
        title: 'Process',
        content: 'I defined ten product personas, mapped the complete order lifecycle, established the operating model and design system, then used AI-assisted development and browser testing to build and validate each role-specific workflow.',
      },
      {
        title: 'Solution',
        content: 'A tenant-aware platform spanning owner and admin tools, waiter and cashier workspaces, kitchen and pickup views, customer storefronts, QR guest ordering, notifications, inventory, attendance, and end-of-day reporting.',
      },
      {
        title: 'Results',
        content: 'The result is a working, demo-ready restaurant system with tested cross-role journeys—from a guest scanning a QR code through kitchen fulfilment, pickup, payment, and operational reporting.',
      },
    ],
  },
  {
    id: '12',
    slug: 'ldun-redesign',
    title: 'LDUN Redesign',
    category: 'Vibe Coding',
    type: 'B2B Fintech Redesign',
    industry: 'Fintech',
    platform: 'Responsive Web',
    year: '2026',
    role: 'Product Lead & AI-Assisted Builder',
    tools: ['React', 'TypeScript', 'Radix UI', 'Playwright', 'AI-Assisted Development'],
    coverGradient: 'from-emerald-500/20 to-teal-500/20',
    description:
      'An evidence-led bilingual redesign for a Saudi B2B fintech, translating complex trade-credit services into a clear, trustworthy, responsive customer journey.',
    impact: 'Moved the redesign beyond static screens into a browser-ready bilingual experience grounded in the real platform, content, and compliance requirements.',
    image: stockImage('projects/ldun/cover.webp'),
    livePreviewUrl: 'https://ldun.vercel.app/',
    tags: ['B2B Fintech', 'Arabic + English', 'AI-Assisted Build'],
    metrics: [
      { label: 'Public Routes', value: '13' },
      { label: 'Languages', value: 'AR + EN' },
      { label: 'Supplier Network', value: '48+' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/ldun/home.png'),
        alt: 'LDUN redesigned Arabic home page',
        caption: 'Core proposition — Explains LDUN’s trade-credit model in direct language and guides business owners toward eligibility and a clear financing start point.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/suppliers.png'),
        alt: 'LDUN accredited suppliers directory',
        caption: 'Supplier directory — Search and sector filters make it easy to explore accredited suppliers and find the right partner for each business need.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/about.png'),
        alt: 'LDUN Arabic about page',
        caption: 'About LDUN — Presents the company story, mission, and Saudi business enablement model with the clarity and trust expected from a regulated financial product.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/faq.png'),
        alt: 'LDUN Arabic frequently asked questions',
        caption: 'Frequently asked questions — Turns recurring questions about eligibility, trade credit, schedules, and Sharia compliance into answers that are easy to find.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/contact.png'),
        alt: 'LDUN Arabic contact page',
        caption: 'Contact and support — Routes buyer and supplier requests to the right team, removes unnecessary fields, and keeps support channels visible.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/register.png'),
        alt: 'LDUN Arabic business registration',
        caption: 'Business registration — Breaks onboarding into understandable steps for company and representative details, with progress and requirements shown before verification.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/buyer-login.png'),
        alt: 'LDUN Arabic buyer login',
        caption: 'Buyer login — Provides a secure, direct gateway for retailers and businesses to follow credit limits, orders, and obligations.',
      },
      {
        type: 'image',
        src: stockImage('projects/ldun/partner-login.png'),
        alt: 'LDUN Arabic supplier partner login',
        caption: 'Partner login — Separates supplier access from buyer access so each side reaches its own tools and data without role or permission confusion.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content: 'The existing site wrapped a credible, regulated fintech product in a generic dashboard-template experience, with broken public routes and limited storytelling for buyers and suppliers.',
      },
      {
        title: 'Process',
        content: 'I audited the live React application in Arabic and English across desktop, tablet, and mobile, catalogued its routes and content, separated verified facts from gaps, then designed and built the new responsive experience with AI as an implementation partner.',
      },
      {
        title: 'Solution',
        content: 'A bilingual, RTL-ready site that explains LDUN’s Sharia-compliant trade-credit model, serves buyers and suppliers clearly, and brings the supplier directory, onboarding, trust, compliance, and support journeys into one coherent system.',
      },
      {
        title: 'Results',
        content: 'A working redesign covering 13 public routes and a 48+ supplier directory, ready for direct browser review and faster stakeholder decisions without a static-only handoff.',
      },
    ],
  },
  {
    id: '10',
    slug: 'ironcore-gym-system',
    title: 'IronCore GYM System',
    category: 'Vibe Coding',
    type: 'Gym Operations Platform',
    industry: 'Fitness',
    platform: 'Dashboard - Mobile App',
    year: '2026',
    role: 'Product Lead & AI-Assisted Builder',
    tools: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Capacitor', 'AI-Assisted Development'],
    coverGradient: 'from-red-500/20 to-zinc-500/20',
    description:
      'A full-stack gym operations platform connecting member management, attendance, payments, expenses, training content, staff permissions, reporting, and mobile check-in.',
    impact: 'Consolidated the daily work of owners and staff into one branch-aware system across web dashboard, mobile shell, API, and public landing experience.',
    image: stockImage('projects/ironcore/cover.webp'),
    tags: ['Gym Operations', 'Web + Mobile', 'AI-Assisted Build'],
    metrics: [
      { label: 'User Roles', value: '5' },
      { label: 'Surfaces', value: '4' },
      { label: 'Architecture', value: 'Full-stack' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('projects/ironcore/dashboard.png'),
        alt: 'IronCore gym system overview',
        caption: 'Business command center — Owners get an immediate view of members, active subscriptions, revenue, expenses, profit, recent payments, and check-in activity.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/members.png'),
        alt: 'IronCore Arabic member management screen with English numerals',
        caption: 'Member lifecycle — Staff can search the full member base, review subscription status, add members, and move directly into renewals or individual records from one Arabic workspace.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/attendance.png'),
        alt: 'IronCore Arabic attendance module using English numerals',
        caption: 'Attendance operations — Live check-ins, quick member lookup, daily attendance indicators, and a filterable history give front-desk teams a clear operating view while all numbers stay in English numerals.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/payments.png'),
        alt: 'IronCore Arabic payments module using English numerals',
        caption: 'Payments and renewals — Teams can register payments, follow transaction status, compare methods, and keep every membership payment traceable from collection through reporting.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/spendings.png'),
        alt: 'IronCore Arabic spendings module using English numerals',
        caption: 'Expense control — Spending records, categories, approvals, budgets, and branch-level filters turn daily operational costs into a manageable and reviewable workflow.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/reports.png'),
        alt: 'IronCore Arabic reports module using English numerals',
        caption: 'Business reporting — Owners can move between revenue, profit, attendance, member, spending, and store views to understand performance without stitching together separate spreadsheets.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/employees.png'),
        alt: 'IronCore Arabic employee management module',
        caption: 'Team administration — Employee profiles, roles, branch access, and employment status are managed centrally so operational access follows real responsibilities.',
      },
      {
        type: 'image',
        src: stockImage('projects/ironcore/store.png'),
        alt: 'IronCore Arabic gym store module using English numerals',
        caption: 'Integrated store — Products, stock, orders, and gym-side retail sit inside the same operating system, allowing staff to serve members and protect inventory from one place.',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Gym teams needed one reliable source of truth for memberships, check-ins, payments, expenses, staff access, branches, training content, and business reporting.',
      },
      {
        title: 'Process',
        content:
          'I modelled the operating rules and five staff/member roles, organized the platform as a shared TypeScript monorepo, and used AI-assisted development with automated tests to move from product requirements into working web, mobile, API, and landing surfaces.',
      },
      {
        title: 'Solution',
        content:
          'A branch-aware operations dashboard and Capacitor mobile experience backed by a secure API, with member records, subscription renewal, attendance and QR check-in, payments, expenses, exercises, store, employees, reports, audit logs, and settings.',
      },
      {
        title: 'Results',
        content:
          'The product now works as a connected full-stack system instead of a dashboard concept, with role-based authorization, shared domain rules, CI checks, and end-to-end coverage for its core gym workflow.',
      },
    ],
  },
  {
    id: '3',
    slug: 'aura-lifestyle-ecom',
    title: 'Aura Lifestyle E-Com',
    category: 'Websites',
    type: 'E-commerce',
    industry: 'Retail',
    platform: 'Web - Responsive',
    year: '2023',
    role: 'Lead Interaction Designer',
    tools: ['Framer', 'Three.js', 'React'],
    coverGradient: 'from-fuchsia-500/20 to-purple-500/20',
    description:
      'A premium storytelling-driven e-commerce experience for a luxury lifestyle brand focusing on motion-rich interactions.',
    impact: 'Lifted engagement and conversion through immersive product storytelling.',
    image: stockImage('unsplash-1523275335684-37898b6baf30.jpg'),
    tags: ['E-commerce', 'Motion', 'Retail'],
    metrics: [
      { label: 'Conversion', value: '+18%' },
      { label: 'AOV', value: '+$45' },
      { label: 'Engagement', value: '+65%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1483985988355-763728e1935b.jpg'),
        alt: 'Aura product showcase',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1490481651871-ab68de25d43d.jpg'),
        alt: 'Lifestyle detail view',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1523275335684-37898b6baf30.jpg'),
        alt: 'Aura motion prototype',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'The brand lacked a digital flagship experience that conveyed premium quality and drove conversions on mobile.',
      },
      {
        title: 'Process',
        content:
          'We mapped the purchase journey, iterated on motion prototypes, and validated performance budgets.',
      },
      {
        title: 'Solution',
        content:
          'A narrative e-commerce flow with immersive product storytelling and frictionless checkout.',
      },
      {
        title: 'Results',
        content:
          'Engagement and conversion rates improved while customer feedback highlighted the premium feel.',
      },
    ],
  },
  {
    id: '5',
    slug: 'cosmos-design-system',
    title: 'Cosmos Design System',
    category: 'Design Systems',
    type: 'Design Ops',
    industry: 'Tech',
    platform: 'Cross-platform',
    year: '2024',
    role: 'Design Systems Lead',
    tools: ['Figma', 'React', 'Style Dictionary'],
    coverGradient: 'from-violet-500/20 to-indigo-500/20',
    description:
      'A comprehensive design language and component library powering dozens of products, ensuring consistency at scale.',
    impact: 'Unlocked faster delivery by standardizing shared UI components.',
    image: stockImage('unsplash-1556740749-887f6717d7e4.jpg'),
    tags: ['Design Systems', 'Scale', 'Components'],
    metrics: [
      { label: 'Components', value: '120+' },
      { label: 'Adoption', value: '35 teams' },
      { label: 'Velocity', value: '+28%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1551434678-e076c223a692.jpg'),
        alt: 'Design system documentation',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1521737604893-d14cc237f11d.jpg'),
        alt: 'Component library overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1556740749-887f6717d7e4.jpg'),
        alt: 'Cosmos system walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Rapid product expansion created inconsistencies and slowed teams due to duplicated UI work.',
      },
      {
        title: 'Process',
        content:
          'We audited existing UI, defined tokens and patterns, and aligned stakeholders on governance.',
      },
      {
        title: 'Solution',
        content:
          'A unified design system with shared components, docs, and tooling that scaled with product teams.',
      },
      {
        title: 'Results',
        content:
          'Design delivery accelerated while product teams gained consistency and faster onboarding.',
      },
    ],
  },
  {
    id: '6',
    slug: 'sahab-government-portal',
    title: 'Sahab Government Portal',
    category: 'Websites',
    type: 'GovTech',
    industry: 'Government',
    platform: 'Web - Enterprise',
    year: '2021',
    role: 'UX Lead',
    tools: ['Figma', 'React', 'Accessibility QA'],
    coverGradient: 'from-slate-500/20 to-blue-500/20',
    description:
      'A citizen-first portal enabling secure access to public services with clear navigation and multilingual support.',
    impact: 'Reduced service friction and improved self-service completion rates.',
    image: stockImage('unsplash-1489515217757-5fd1be406fef.jpg'),
    tags: ['GovTech', 'Accessibility', 'Service Design'],
    metrics: [
      { label: 'Adoption', value: '+64%' },
      { label: 'Task Time', value: '-35%' },
      { label: 'CSAT', value: '4.7' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1498050108023-c5249f4df085.jpg'),
        alt: 'Government portal overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1519389950473-47ba0277781c.jpg'),
        alt: 'Citizen service workflow',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1489515217757-5fd1be406fef.jpg'),
        alt: 'Sahab portal prototype',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Citizens faced fragmented workflows and confusing service navigation across departments.',
      },
      {
        title: 'Process',
        content:
          'We mapped key journeys, tested multilingual flows, and simplified top tasks into clear paths.',
      },
      {
        title: 'Solution',
        content:
          'A unified portal with role-based access, plain-language copy, and optimized request tracking.',
      },
      {
        title: 'Results',
        content:
          'Service completion rates increased while support requests dropped due to clearer self-service.',
      },
    ],
  },
  {
    id: '7',
    slug: 'dashboard-placeholder-01',
    isDraft: true,
    title: 'Dashboard Project (Placeholder 01)',
    category: 'Dashboards',
    type: 'Analytics Dashboard',
    industry: 'B2B SaaS',
    platform: 'Web - Responsive',
    year: 'TBD',
    role: 'TBD',
    tools: ['TBD'],
    coverGradient: 'from-sky-500/20 to-cyan-500/20',
    description:
      'Placeholder entry for an upcoming dashboard case study. Replace this content with the real project details.',
    impact: 'TBD',
    image: stockImage('unsplash-1516549655169-df83a0774514.jpg'),
    tags: ['Dashboard', 'Analytics', 'B2B'],
    metrics: [
      { label: 'Status', value: 'TBD' },
      { label: 'Launch', value: 'TBD' },
      { label: 'Impact', value: 'TBD' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1516549655169-df83a0774514.jpg'),
        alt: 'Dashboard placeholder preview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1520607162513-77705c0f0d4a.jpg'),
        alt: 'Dashboard placeholder detail',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1550745165-9bc0b252726f.jpg'),
        alt: 'Dashboard placeholder walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Placeholder content. Replace with the real problem statement for the dashboard project.',
      },
      {
        title: 'Process',
        content:
          'Placeholder content. Replace with the process summary and research notes.',
      },
      {
        title: 'Solution',
        content:
          'Placeholder content. Replace with the actual dashboard solution details.',
      },
      {
        title: 'Results',
        content:
          'Placeholder content. Replace with measurable outcomes once available.',
      },
    ],
  },
  {
    id: '8',
    slug: 'dashboard-placeholder-02',
    isDraft: true,
    title: 'Dashboard Project (Placeholder 02)',
    category: 'Dashboards',
    type: 'Operations Dashboard',
    industry: 'Enterprise',
    platform: 'Web - Responsive',
    year: 'TBD',
    role: 'TBD',
    tools: ['TBD'],
    coverGradient: 'from-emerald-500/20 to-lime-500/20',
    description:
      'Placeholder entry for an upcoming dashboard case study. Replace this content with the real project details.',
    impact: 'TBD',
    image: stockImage('unsplash-1487017159836-4e23ece2e4cf.jpg'),
    tags: ['Dashboard', 'Operations', 'Enterprise'],
    metrics: [
      { label: 'Status', value: 'TBD' },
      { label: 'Launch', value: 'TBD' },
      { label: 'Impact', value: 'TBD' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1487017159836-4e23ece2e4cf.jpg'),
        alt: 'Dashboard placeholder overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1489515217757-5fd1be406fef.jpg'),
        alt: 'Dashboard placeholder flow',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1490481651871-ab68de25d43d.jpg'),
        alt: 'Dashboard placeholder walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Placeholder content. Replace with the real problem statement for the dashboard project.',
      },
      {
        title: 'Process',
        content:
          'Placeholder content. Replace with the process summary and research notes.',
      },
      {
        title: 'Solution',
        content:
          'Placeholder content. Replace with the actual dashboard solution details.',
      },
      {
        title: 'Results',
        content:
          'Placeholder content. Replace with measurable outcomes once available.',
      },
    ],
  },
];
