export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'video' | 'design' | 'marketing';
  thumbnailUrl: string;
  videoUrl?: string; // Standard video URL (Pexels, YouTube embed, etc.)
  tags: string[];
  tools: string[];
  metrics?: { label: string; value: string }[];
  stats?: { date: string; value: number }[]; // Monthly growth data for marketing case studies
  longDescription?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'video' | 'design' | 'marketing' | 'general';
  message: string;
  timestamp: number;
  read: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  iconName: string;
  capabilities: string[];
  pricingRange?: string;
}
