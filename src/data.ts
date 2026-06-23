import { PortfolioItem, ServiceDetail } from './types';

export const BIO_DATA = {
  name: "Ali Hussain",
  title: "Multi-Disciplinary Creator",
  subtitle: "Video Editor • Digital Marketer • Graphic Designer",
  about: "I bridge the gap between aesthetics and performance. For the past 5 years, I have worked with creators, SaaS founders, and e-commerce brands to edit scroll-stopping videos, craft bespoke visual identities, and run high-ROI digital marketing campaigns. I don't just create assets; I build engines that drive views, engagement, and revenue.",
  avatarUrl: "/assets/avatar.jpg", // Professional, modern creator portrait
  skills: [
    { category: "Video Editing", items: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design", "Color Grading", "Kinetic Typography"] },
    { category: "Graphic Design", items: ["Figma", "Adobe Illustrator", "Photoshop", "Brand Identity", "UI/UX Mockups", "Thumbnail Design"] },
    { category: "Digital Marketing", items: ["Meta Ads Manager", "Google Ads", "SEO & Copywriting", "Conversion Rate Optimization", "GA4 / Analytics", "Email Funnels"] }
  ],
  stats: [
    { label: "Views Generated", value: "35M+" },
    { label: "Projects Completed", value: "240+" },
    { label: "Ad Spend Managed", value: "$180K+" },
    { label: "Client Satisfaction", value: "99%" }
  ]
};

export const SERVICES: ServiceDetail[] = [
  {
    id: "video",
    title: "High-Retention Video Editing",
    description: "Whether it is short-form vertical video (TikTok/Reels/Shorts) or premium YouTube documentaries, I edit to capture and hold attention, leveraging psychological pacing, sound effects, and kinetic text.",
    iconName: "Video",
    capabilities: ["Vertical Content (CapCut/Premiere)", "Long-Form Content Strategy", "Custom Kinetic Text & Graphics", "Dynamic Sound Overlays", "Advanced Color Grading"],
    pricingRange: "Starts at $400 / month"
  },
  {
    id: "design",
    title: "Brand & Graphic Designing",
    description: "We make your brand look premium. From high-conversion social media banners and thumbnails to comprehensive SaaS dashboard UI mockups and complete brand guidelines.",
    iconName: "Palette",
    capabilities: ["SaaS & App UI/UX Mockups", "YouTube Thumbnails (High CTR)", "Complete Visual Identity Packs", "Social Media Carousels", "Pitch Decks & Presentations"],
    pricingRange: "Starts at $500 / project"
  },
  {
    id: "marketing",
    title: "Performance Digital Marketing",
    description: "Stop wasting money on random ads. I engineer full-funnel acquisition loops combining compelling ad copy, custom creative designs, hyper-targeted Meta/Google campaigns, and continuous landing page optimization.",
    iconName: "TrendingUp",
    capabilities: ["Meta & Google Ad Campaigns", "Full-Funnel CRO Audits", "High-Converting Ad Copywriting", "Newsletter & Email Marketing", "A/B Testing Frameworks"],
    pricingRange: "Starts at $800 / month + Ad Spend"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "showreel",
    title: "The Creator Shorts Growth Engine",
    description: "High-velocity, hyper-engaging vertical edits incorporating pop-culture graphics, adaptive sound effects, and retention-maximized subtitle timing.",
    category: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=89e37bc603099fffa361ee160914c62c954e7d4c&profile_id=165&oauth2_token_id=57447761",
    tags: ["TikTok / Shorts", "Personal Branding", "High Retention"],
    tools: ["Adobe Premiere Pro", "After Effects", "Adobe Audition"],
    metrics: [
      { label: "Avg. Watch Time", value: "112%" },
      { label: "Views Generated", value: "8.5M+" }
    ]
  },
  {
    id: "saas-commercial",
    title: "SaaS Fintech Commercial Promo",
    description: "A premium corporate promo with high-tech 3D elements, detailed UI screen overlays, and rhythmic electronic music orchestration.",
    category: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://player.vimeo.com/external/517602120.sd.mp4?s=d7e634739eb3efc793ff0e99d8d6f1bf84fc9bfb&profile_id=165&oauth2_token_id=57447761",
    tags: ["B2B SaaS", "Motion Graphics", "Cinematic Promo"],
    tools: ["DaVinci Resolve", "After Effects", "Cinema 4D"],
    metrics: [
      { label: "Direct Signups", value: "+340" },
      { label: "Click-Through Rate", value: "4.8%" }
    ]
  },
  {
    id: "travel-cinematic",
    title: "Atmospheric Brand Storytelling",
    description: "Slow-paced, beautiful travel and product story video designed for lifestyle brands. Focused on color grading, sound design, and emotional connection.",
    category: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054fc1b5d337a15557ca6da08850731&profile_id=165&oauth2_token_id=57447761",
    tags: ["Brand Film", "Color Grading", "Cinematography"],
    tools: ["Premiere Pro", "LUMETRI Color", "Dehancer"],
    metrics: [
      { label: "Brand Recall", value: "+82%" },
      { label: "Engagement Rate", value: "12.4%" }
    ]
  },
  {
    id: "branding-studio",
    title: "Brutalist Web3 Brand Overhaul",
    description: "A comprehensive brand identity set for a decentralized dev guild. Includes dynamic vector guidelines, high-contrast grids, and custom type sets.",
    category: "design",
    thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    tags: ["Visual Identity", "Branding", "Neo-Brutalism"],
    tools: ["Adobe Illustrator", "Figma", "Photoshop"],
    metrics: [
      { label: "Assets Delivered", value: "42" },
      { label: "Social Impressions", value: "+180%" }
    ],
    longDescription: "This project was aimed at establishing a strong, raw aesthetic for a high-performance blockchain engineering collective. Leveraging neon color accents, custom geometric grids, and high-contrast letterforms, we built a visual ecosystem that communicates security, power, and transparency."
  },
  {
    id: "dashboard-design",
    title: "Fintech Dashboard UI/UX System",
    description: "High-fidelity, responsive analytics dashboard designed for an API-first startup. Tailored dark theme focusing on visual hierarchy and custom icon sets.",
    category: "design",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    tags: ["UI/UX Design", "Figma Design", "Component Library"],
    tools: ["Figma", "Tailwind UI", "Adobe Illustrator"],
    metrics: [
      { label: "Screen Layouts", value: "18" },
      { label: "Usability Rating", value: "9.6/10" }
    ],
    longDescription: "A full-scale UI kit designed with Figma's latest variables and autolayout properties. The dashboard optimizes information density to prevent cognitive load, utilizing clean data modules, contrasting status markers, and highly legible typography pairing."
  },
  {
    id: "saas-campaign",
    title: "E-Commerce Performance Meta Funnel",
    description: "Scale-up ad campaign targeting high-intent buyers. Designed custom scroll-stopping static creatives and A/B tested copy lines, leading to historic ROI.",
    category: "marketing",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    tags: ["Paid Ads", "Ad Creatives", "CRO Funnels"],
    tools: ["Meta Ads Manager", "Figma", "GA4", "Unbounce"],
    metrics: [
      { label: "ROAS Managed", value: "5.4x" },
      { label: "CPA Reduction", value: "-42%" }
    ],
    stats: [
      { date: "Month 1", value: 12000 },
      { date: "Month 2", value: 24000 },
      { date: "Month 3", value: 58000 },
      { date: "Month 4", value: 94000 }
    ],
    longDescription: "Designed and executed a full-funnel customer acquisition campaign. By separating ad sets into Cold Hook, Warm Education, and Retargeting buckets, we matched creative formats (short video vs static benefits) to buyer intent, reducing CPA significantly while boosting checkout average order value (AOV)."
  },
  {
    id: "organic-marketing",
    title: "Viral Founder Branding Matrix",
    description: "organic LinkedIn and Twitter content system for a venture-backed founder, crafting daily expert insights that sparked organic inquiries and hire opportunities.",
    category: "marketing",
    thumbnailUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop",
    tags: ["Social Growth", "Copywriting", "Lead Generation"],
    tools: ["Notion", "Shield Analytics", "Typefully"],
    metrics: [
      { label: "Organic Reach", value: "2.4M+" },
      { label: "Inbound Leads", value: "118" }
    ],
    stats: [
      { date: "Week 1", value: 120 },
      { date: "Week 2", value: 450 },
      { date: "Week 3", value: 980 },
      { date: "Week 4", value: 2400 } // scaled reach in Thousands
    ],
    longDescription: "Created a comprehensive storytelling machine. We established the brand voice (knowledgeable, authentic, brutal honesty), planned content sprints, and designed beautiful visual graphics to break up heavy posts. The result was multi-million impression virality and high-ticket sales pipelines without paid ads."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Ali is an exceptional creative partner. His short-form edits doubled our average view duration, while the LinkedIn content strategy brought in multiple enterprise leads directly in my DM.",
    author: "Alex Rivers",
    role: "CEO, StreamFlow SaaS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "He redesigned our brand identity and crafted high-performing Meta creatives. We saw an immediate 35% reduction in CPA, and our branding has never looked cleaner.",
    author: "Elena Rostova",
    role: "Founder, Bloom Skincare",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  }
];
