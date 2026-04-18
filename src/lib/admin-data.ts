export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  totalGenerations: number;
  activeUsers: number;
  creditsUsed: number;
  creditsPurchased: number;
  avgRating: number;
  conversionRate: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  credits: number;
  generations: number;
  joined: string;
  lastActive: string;
  status: "active" | "inactive" | "suspended";
  plan: "free" | "starter" | "standard" | "popular" | "business";
}

export interface AdminTransaction {
  id: string;
  userId: string;
  userName: string;
  type: "purchase" | "usage" | "referral";
  amount: number;
  credits: number;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

export const mockAdminStats: AdminStats = {
  totalUsers: 11230,
  totalRevenue: 24850.75,
  totalGenerations: 52847,
  activeUsers: 2340,
  creditsUsed: 89420,
  creditsPurchased: 125000,
  avgRating: 4.9,
  conversionRate: 12.5,
};

export const mockAdminUsers: AdminUser[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", credits: 150, generations: 23, joined: "2026-03-15", lastActive: "2026-04-18", status: "active", plan: "standard" },
  { id: "2", name: "Mike Chen", email: "mike@example.com", credits: 500, generations: 87, joined: "2026-02-20", lastActive: "2026-04-17", status: "active", plan: "popular" },
  { id: "3", name: "Emily Davis", email: "emily@example.com", credits: 0, generations: 5, joined: "2026-04-01", lastActive: "2026-04-10", status: "inactive", plan: "free" },
  { id: "4", name: "Alex Rivera", email: "alex@example.com", credits: 1000, generations: 156, joined: "2026-01-10", lastActive: "2026-04-18", status: "active", plan: "business" },
  { id: "5", name: "Jordan Lee", email: "jordan@example.com", credits: 50, generations: 12, joined: "2026-03-28", lastActive: "2026-04-16", status: "active", plan: "starter" },
  { id: "6", name: "Priya Patel", email: "priya@example.com", credits: 25, generations: 3, joined: "2026-04-12", lastActive: "2026-04-14", status: "inactive", plan: "free" },
  { id: "7", name: "Tom Wilson", email: "tom@example.com", credits: 200, generations: 45, joined: "2026-02-05", lastActive: "2026-04-18", status: "active", plan: "standard" },
  { id: "8", name: "Lisa Kim", email: "lisa@example.com", credits: 450, generations: 78, joined: "2026-01-22", lastActive: "2026-04-17", status: "active", plan: "popular" },
];

export const mockAdminTransactions: AdminTransaction[] = [
  { id: "t1", userId: "1", userName: "Sarah Johnson", type: "purchase", amount: 10, credits: 200, description: "Standard Pack", timestamp: "2026-04-18T10:30:00Z", status: "completed" },
  { id: "t2", userId: "2", userName: "Mike Chen", type: "usage", amount: 0, credits: -3, description: "Image generation", timestamp: "2026-04-18T10:25:00Z", status: "completed" },
  { id: "t3", userId: "4", userName: "Alex Rivera", type: "purchase", amount: 50, credits: 1000, description: "Business Pack", timestamp: "2026-04-18T09:15:00Z", status: "completed" },
  { id: "t4", userId: "5", userName: "Jordan Lee", type: "usage", amount: 0, credits: -1, description: "Quick generation", timestamp: "2026-04-18T08:45:00Z", status: "completed" },
  { id: "t5", userId: "7", userName: "Tom Wilson", type: "referral", amount: 0, credits: 10, description: "Referral bonus", timestamp: "2026-04-17T22:00:00Z", status: "completed" },
  { id: "t6", userId: "8", userName: "Lisa Kim", type: "purchase", amount: 25, credits: 500, description: "Popular Pack", timestamp: "2026-04-17T19:30:00Z", status: "completed" },
  { id: "t7", userId: "3", userName: "Emily Davis", type: "purchase", amount: 2.5, credits: 50, description: "Starter Pack", timestamp: "2026-04-17T14:00:00Z", status: "pending" },
];

export const faqItems = [
  { q: "What is Craft AI Branding Studio?", a: "Craft is an AI-powered branding platform that lets you create professional logos, posters, social media graphics, and more in seconds. Our advanced AI models produce high-quality designs at a fraction of the cost of hiring a designer." },
  { q: "How do credits work?", a: "Each design generation costs between 1-3 credits depending on the quality setting. Turbo mode uses 1 credit, Default uses 2 credits, and Quality mode uses 3 credits. Additional options like transparent backgrounds (+1 credit) and character references (+2 credits) cost extra. New users get 50 free credits to start." },
  { q: "What image sizes are supported?", a: "We support multiple aspect ratios including 1:1 (square), 16:9 (landscape), 9:16 (portrait), 4:3, 3:4, 3:2, and 2:3. This covers all major social media platforms and print formats." },
  { q: "Can I use generated images commercially?", a: "Yes! All images generated with Craft can be used for commercial purposes including branding, marketing materials, social media, website design, and print media. Full commercial rights are included with every generation." },
  { q: "How does Craft compare to Midjourney or DALL-E?", a: "Craft is specifically designed for branding use cases, with optimized prompts for logos, posters, and social media content. We offer pay-as-you-go pricing starting at just $2.50 for 50 credits, compared to $10-30/month subscriptions from other platforms. No subscription required!" },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and digital wallets through our secure payment processor. All transactions are encrypted and your payment information is never stored on our servers." },
];
