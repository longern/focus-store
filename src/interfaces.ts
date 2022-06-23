export interface Site {
  title: string;
  logo: string;
  coverImage: {
    src: string;
    lazySrc: string;
  };

  featured: Array<Product>;

  aboutUs: string;
  socialAccounts: Array<{ type: string; link: string }>;
  testimonials: Array<{
    avatar: string;
    name: string;
    caption: string;
    quote: string;
  }>;

  currencyPrefix: string;
  currencySuffix: string;
}

export const site = {} as Site;

if (import.meta.env.PUBLIC_SITE) {
  console.log("[Focus] Fetching site data");
  const response = await fetch(`${import.meta.env.PUBLIC_SITE}/api/site`);
  if (
    response.status == 200 &&
    response.headers.get("Content-Type") == "application/json"
  )
    Object.assign(site, await response.json());
}

export interface ProductOption {
  name: string;
  values: Array<{
    text: string;
    image?: string;
    priceModifier?: string;
  }>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: Array<string>;
  description: string;
  options: Array<ProductOption>;
}

export const products = <Array<Product>>[
  {
    id: "id",
    name: "Product 1",
    price: 980,
    images: ["https://picsum.photos/510/300?random"],
    description: "This is a <b>great</b> product.",
  },
];
