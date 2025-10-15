export interface MenuItem {
  name: string;
  description: string;
  price: string; // e.g., "Rp 20.000"
  imageUrl: string;
  isPopular: boolean;
  ingredients?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  handle: string;
  rating: number;
}

export interface SocialPost {
  platform: 'instagram' | 'tiktok';
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
}