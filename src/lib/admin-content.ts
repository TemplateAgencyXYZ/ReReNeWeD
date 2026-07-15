export interface AdminContentSection {
  key: string;
  label: string;
  pageName: string;
  defaultValue: string;
}

export const ADMIN_CONTENT_SECTIONS: AdminContentSection[] = [
  {
    key: "hero_homepage",
    label: "Hero",
    pageName: "homepage",
    defaultValue:
      "Title: ReReNeWeD Sustainable Stationery for Conscious Living\nSubtitle: Discover recycled stationery designed to reduce waste, elevate everyday writing, and give useful materials a thoughtful second life.\nButton Text: Shop All Products",
  },
  {
    key: "our_story",
    label: "Our Story",
    pageName: "About / Our Story",
    defaultValue:
      "Our Story\n\nReReNeWeD began with a simple idea: useful materials deserve a second life. We collect discarded paper, plastic, and fabric from offices, schools, and communities, then transform them into thoughtfully designed stationery.\n\nEvery pencil, notebook, and diary we make carries a smaller footprint than its virgin counterpart. We work with local recyclers and artisans to keep materials in circulation and reduce landfill waste.",
  },
  {
    key: "sustainability",
    label: "Sustainability",
    pageName: "Sustainability",
    defaultValue:
      "Our Commitment to Sustainability\n\nAt ReReNeWeD, sustainability is not a marketing line. It is the way we source, make, package, and ship every product.\n\nWe use post-consumer recycled paper, reclaimed wood, and salvaged plastic. Our packaging is plastic-free and fully recyclable. We offset shipping emissions through verified climate partners and regularly audit our supply chain for ethical labor practices.",
  },
  {
    key: "faq",
    label: "FAQ",
    pageName: "FAQ",
    defaultValue:
      "Frequently Asked Questions\n\nWhat does 'recycled' mean on your products?\nThe product is made from post-consumer or post-industrial material that has been collected, processed, and remanufactured.\n\nAre your products recyclable at end of life?\nMost paper and cardboard items are curbside recyclable. Check individual product pages for specific disposal guidance.\n\nHow long does shipping take?\nStandard orders ship within 2 business days and arrive in 5-7 business days across India.",
  },
  {
    key: "shipping_info",
    label: "Shipping Info",
    pageName: "Shipping",
    defaultValue:
      "Shipping Information\n\nWe ship across India. Orders placed before 2 PM IST on business days are dispatched the same day. Standard delivery takes 5-7 business days. Express delivery is available for metro areas.\n\nOrders over ₹2,000 qualify for free standard shipping. For orders below that, a flat shipping fee of ₹99 applies.",
  },
  {
    key: "returns_policy",
    label: "Returns Policy",
    pageName: "Returns",
    defaultValue:
      "Returns & Exchanges\n\nWe accept returns within 7 days of delivery if the product is unused and in original packaging. To initiate a return, contact us with your order ID.\n\nRefunds are processed within 5-7 business days after we receive the returned item. Digital or personalized items are not eligible for return.",
  },
  {
    key: "privacy_policy",
    label: "Privacy Policy",
    pageName: "Privacy",
    defaultValue:
      "Privacy Policy\n\nWe collect only the information needed to fulfill your order and communicate with you about your purchase. This includes your name, shipping address, email, and phone number.\n\nWe do not sell or rent your personal information. Payment details are handled securely by Razorpay and are never stored on our servers.",
  },
  {
    key: "terms_of_service",
    label: "Terms of Service",
    pageName: "Terms",
    defaultValue:
      "Terms of Service\n\nBy using our website and placing an order, you agree to these terms. All prices are listed in Indian Rupees and include applicable taxes unless stated otherwise.\n\nWe reserve the right to update product information and pricing. We are not responsible for delays caused by shipping carriers or customs.",
  },
  {
    key: "contact_us",
    label: "Contact Us",
    pageName: "Contact",
    defaultValue:
      "Email: hello@rerenewed.com\nPhone: +91 98765 43210\nAddress: 12 Gandhi Road, Bengaluru, Karnataka 560001\nHours: Monday to Saturday, 10 AM to 6 PM IST",
  },
  {
    key: "footer_tagline",
    label: "Footer",
    pageName: "Footer",
    defaultValue:
      "Quality recycled goods for conscious consumers. Every purchase supports sustainable living.",
  },
];

export const DEFAULT_CONTENT_VALUES = Object.fromEntries(
  ADMIN_CONTENT_SECTIONS.map((section) => [section.key, section.defaultValue])
) as Record<string, string>;