export interface Site {
  title: string;
  logo: string;
  coverImage: string;

  aboutUs: string;
  socialAccounts: Array<{ type: string; link: string }>;
  testimonials: Array<{
    avatar: string;
    name: string;
    caption: string;
    quote: string;
  }>;
}
