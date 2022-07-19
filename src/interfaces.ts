export interface Address {
  fullName: string;
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  tel: string;
}

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
  deployHook: string;

  paymentMethods: Array<{ supportedMethods: string; data?: any }>;
  paymentInstructions: string;
}

export const site = {} as Site;

if (import.meta.env.PUBLIC_SITE) {
  console.log("[Focus] Fetching site data");
  await fetch(`${import.meta.env.PUBLIC_SITE}/api/site`)
    .then(async (response) => {
      if (
        response.status == 200 &&
        response.headers.get("Content-Type") == "application/json"
      )
        Object.assign(site, await response.json());
    })
    .catch((err) => {
      console.log(err);
    });
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
  category: string;
  description: string;
  options: Array<ProductOption>;
  updatedAt: string;
}

export const products = <Array<Product>>[
  {
    id: "id",
    name: "Product 1",
    price: 980,
    images: [
      "https://picsum.photos/510/300?random",
      "https://picsum.photos/510/300?random&i=2",
    ],
    description: "This is a <b>great</b> product.",
    options: [
      {
        name: "Option 1",
        values: [
          { text: "Value 1" },
          { text: "Value 2", priceModifier: "+10" },
        ],
      },
    ],
  },
];

export interface Category {
  name: string;
  children: Array<Category>;
}

export const rootCategory = <Category>{ name: "", children: [] };

if (import.meta.env.PUBLIC_SITE) {
  const response = await fetch(`${import.meta.env.PUBLIC_SITE}/api/categories`);
  if (
    response.status == 200 &&
    response.headers.get("Content-Type") == "application/json"
  )
    Object.assign(rootCategory, await response.json());
}

export interface Order {
  id: string;
  products: Array<{
    id: string;
    name: string;
    image: string;
    choices: Record<string, string>;
    unitPrice: number;
    quantity: number;
  }>;
  totalPrice: number;
  note: string;
  address: Address;
  payment: string;
  status: "pendingPayment" | "cancelled" | "paid" | "shipping" | "completed";
  createdAt: string;
}
