import { Service } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    shortDescription: 'High-performance bespoke websites, progressive web applications, and immersive interactive digital platforms.',
    detailedDescription: 'We build swift, responsive, and search-optimized web experiences using robust technologies like React, Next.js, and Node.js. Every line of code is handwritten for maximum performance, clean visual rendering, and pixel-perfect responsiveness across screens.',
    iconName: 'Code',
    imageRef: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'web-types',
        name: 'Development Architecture',
        description: 'Choose the ideal structure and scope for your online representation.',
        options: [
          {
            id: 'landing-page',
            name: 'Bespoke Single-Page / Landing Page',
            description: 'A clean, high-converting layout focusing on visual narrative, smooth scroll effects, and structured user conversion paths.',
            price: 550,
            type: 'fixed'
          },
          {
            id: 'corp-site',
            name: 'Corporate Web Presence (Multi-page)',
            description: 'Complete multi-page site (up to 7 custom pages) built for brand credibility, service descriptions, and integrated team dashboards.',
            price: 1350,
            type: 'fixed'
          },
          {
            id: 'ecommerce',
            name: 'Premium E-Commerce Platform',
            description: 'Robust shopping cart architecture, fully structured product grid, stock level tracking, and integrated Stripe/PayPal checkouts.',
            price: 1950,
            type: 'fixed'
          },
          {
            id: 'custom-app',
            name: 'Tailored Enterprise Web Application',
            description: 'Dynamic dashboards, secure user auth profiles, interactive custom database schemas, and external API syncing.',
            price: 2850,
            type: 'fixed'
          }
        ]
      },
      {
        id: 'web-addons',
        name: 'Optimization & Integration Add-ons',
        description: 'Accelerate visibility, reliability, and security of your digital application.',
        options: [
          {
            id: 'seo-setup',
            name: 'Technical SEO Audit & Setup',
            description: 'Advanced schema marking, fast-loading images, index optimization, and XML sitemap registers.',
            price: 250,
            type: 'fixed'
          },
          {
            id: 'cms-integration',
            name: 'Headless CMS Integration',
            description: 'Hook up your site with Strapi, Contentful, or Sanity.io so your team can publish content in real-time without developer help.',
            price: 450,
            type: 'fixed'
          },
          {
            id: 'maintenance-monthly',
            name: 'Monthly Studio Maintenance & Guard',
            description: 'Weekly database backups, speed optimization checks, package updates, and 3 hours of technical support.',
            price: 120,
            type: 'monthly'
          }
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    shortDescription: 'Strategic social management, advanced search rankings, and high-impact paid marketing campaigns.',
    detailedDescription: 'We design ROI-driven growth frameworks that bridge the gap between creative storytelling and hard analytics. From organic reach optimization to precisely targeted paid acquisition, we unlock compounding traffic and genuine brand loyalty.',
    iconName: 'Megaphone',
    imageRef: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'marketing-organic',
        name: 'Organic Acquisition & Management',
        description: 'Cultivate an authentic, compounding audience across search and social channels.',
        options: [
          {
            id: 'social-mgmt',
            name: 'Social Media Strategy & Core Management',
            description: 'Interactive post calendars, aesthetic curation, copywriting, and active grid optimization (3 platforms).',
            price: 450,
            type: 'monthly'
          },
          {
            id: 'seo-monthly',
            name: 'Compounding SEO & Authority Optimization',
            description: 'Advanced keyphrase clusters, local GMB authority building, search rank logs, and premium backlink blueprints.',
            price: 500,
            type: 'monthly'
          },
          {
            id: 'content-copywriting',
            name: 'Content Marketing & Newsletter Setup',
            description: 'High-value monthly blog posts (4) paired with custom email newsletter newsletters to nurture leads.',
            price: 350,
            type: 'monthly'
          }
        ]
      },
      {
        id: 'marketing-paid',
        name: 'Paid Performance Campaigns',
        description: 'Deploy conversion-optimized budgets into high-intent ad channels.',
        options: [
          {
            id: 'ppc-management',
            name: 'Meta & Google Ads Campaign Strategy',
            description: 'Advanced custom audience models, pixel setups, split A/B visual creatives, and regular budget optimization.',
            price: 380,
            type: 'monthly'
          },
          {
            id: 'landing-marketing',
            name: 'High-Conversion Funnel Design',
            description: 'Setup and design of single marketing funnels containing dedicated landing copies, visual headers, and lead captures.',
            price: 480,
            type: 'fixed'
          }
        ]
      }
    ]
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    shortDescription: 'Cinematic storytelling, dynamic social content, viral reels, and crisp commercial cuts.',
    detailedDescription: 'Our post-production brings rhythm, style, and structure to raw footages. We balance dynamic pacing, seamless soundscapes, color correction, and elegant motion cues to deliver visual content that commands attention.',
    iconName: 'Video',
    imageRef: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'social-video',
        name: 'Short-Form Content Production',
        description: 'Paced, highly engaging shorts and reels customized for algorithmic virality.',
        options: [
          {
            id: 'reel-short',
            name: 'Premium TikTok / Reel / Short',
            description: 'Up to 60 seconds of video containing engaging captions, dynamic visual zooms, sound effects, and sound mixing.',
            price: 85,
            type: 'per_unit',
            unitLabel: 'Video'
          },
          {
            id: 'social-bundle',
            name: 'Viral Short-Form Monthly Bundle (12 Videos)',
            description: 'Batch post-production of 12 reels/shorts. Cohesive branding, trend-oriented sound tracks, and batch sound grading.',
            price: 850,
            type: 'monthly'
          }
        ]
      },
      {
        id: 'long-video',
        name: 'Cinematic & Corporate Post-Production',
        description: 'Polished edits built for business presentations, branding, or high-end YouTube channels.',
        options: [
          {
            id: 'corporate-promo',
            name: 'B2B Promotional / Brand Video',
            description: 'Up to 3 minutes of high-fidelity editing. Advanced color mapping, stock b-roll selection, voiceover balance, and lower thirds.',
            price: 480,
            type: 'fixed'
          },
          {
            id: 'youtube-edit',
            name: 'YouTube Editorial Cut (Up to 15 mins)',
            description: 'Complete pacing cuts, interactive dynamic popups, call-to-actions, sound staging, and thumbnail conceptual assets.',
            price: 160,
            type: 'per_unit',
            unitLabel: 'Video'
          },
          {
            id: 'motion-graphics',
            name: 'Custom Motion Graphics Overlay',
            description: 'Animated title screens, bespoke lower-third banners, custom infographic visualizers, and subtle 2D transitions.',
            price: 220,
            type: 'fixed'
          }
        ]
      }
    ]
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing',
    shortDescription: 'Striking visual designs, high-fidelity brand assets, print publications, and dynamic templates.',
    detailedDescription: 'We design systems of visual communication that make complex messages beautiful and immediate. From digital social boards to tactile packaging layouts, we elevate every touchpoint with rigorous typographic harmony and balanced grids.',
    iconName: 'Palette',
    imageRef: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'graphic-digital',
        name: 'Digital Visual Assets',
        description: 'Modern, high-contrast layouts tailored for screens and social feeds.',
        options: [
          {
            id: 'social-post-bundle',
            name: 'Brand Social Media Bundle (6 Templates)',
            description: 'Custom Figma/Canva templates containing coherent grid hierarchies, typographic headers, and signature photo frames.',
            price: 160,
            type: 'fixed'
          },
          {
            id: 'brand-book',
            name: 'Comprehensive Identity Brand Guidelines',
            description: 'A polished, extensive brand guide containing visual rules, typography rules, core brand statements, and application templates.',
            price: 320,
            type: 'fixed'
          },
          {
            id: 'digital-brochure',
            name: 'Interactive Brochure / Pitch Deck (10 slides)',
            description: 'Stunning commercial pitch layouts formatted with clean spacing, elegant charts, and custom infographic assets.',
            price: 240,
            type: 'fixed'
          }
        ]
      },
      {
        id: 'graphic-print',
        name: 'Tactile Print & Structural Packaging',
        description: 'High-resolution, vector-accurate layouts designed for physical materials.',
        options: [
          {
            id: 'stationery',
            name: 'Corporate Stationery Set',
            description: 'Print-ready high-fidelity templates for business cards, letterheads, envelope scales, and presentation files.',
            price: 90,
            type: 'fixed'
          },
          {
            id: 'packaging-design',
            name: 'Bespoke Product Packaging & Die-Lines',
            description: 'Vector-perfect label sheets, complete box folds, 3D high-resolution renders, and material substrate consultation.',
            price: 280,
            type: 'fixed'
          }
        ]
      }
    ]
  },
  {
    id: 'logo-making',
    name: 'Logo Making',
    shortDescription: 'Iconic, timeless logos, responsive emblem systems, and high-fidelity custom brandmarks.',
    detailedDescription: 'A logo is the distilled essence of a brand. We craft timeless symbols that speak with clarity and gravitas. Every emblem is engineered with geometric precision to look sharp on a tiny browser tab and scale effortlessly to immense billboards.',
    iconName: 'Flame',
    imageRef: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'logo-types',
        name: 'Logo Creation Packages',
        description: 'Select the optimal design tier and file deliverables for your trademark mark.',
        options: [
          {
            id: 'minimalist-logo',
            name: 'Bespoke Minimalist Vector Logo',
            description: '2 premium logo directions, vector layout formats (SVG, AI, EPS), monochromatic alternates, and safe-zone parameters.',
            price: 140,
            type: 'fixed'
          },
          {
            id: 'logo-premium-3d',
            name: 'Timeless Premium 3D Emblem',
            description: 'Complex, textured emblem styles with rich shading gradients, and 3 distinct high-fidelity 3D mockups.',
            price: 240,
            type: 'fixed'
          },
          {
            id: 'full-logo-suite',
            name: 'Unified Responsive Logo Suite',
            description: 'Complete multi-format system: primary logo, secondary badge, responsive favicon layout, and animated intro bumper.',
            price: 380,
            type: 'fixed'
          },
          {
            id: 'illustrative-mascot',
            name: 'Illustrative / Mascot Trademark Mark',
            description: 'Custom handcrafted character art or highly complex heraldic emblem assets. Perfect for gaming or heritage brands.',
            price: 310,
            type: 'fixed'
          }
        ]
      }
    ]
  }
];
