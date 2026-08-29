export interface CreatorCategory {
  id: string;
  name: string;
  slug: string;
}

export interface UpdateProfileData {
  bio?: string;
  creatorCategoryId?: string;
  displayUsername?: string;
  socialLinks?: Record<string, string>;
  image?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  displayUsername?: string;
  bio?: string;
  creatorCategoryId?: string;
  creatorCategory?: CreatorCategory;
  socialLinks?: Record<string, string>;
}
