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
    pageName: "Homepage",
    defaultValue:
      "Title: ReReNeWeD Sustainable Stationery for Conscious Living\nSubtitle: Discover recycled stationery designed to reduce waste, elevate everyday writing, and give useful materials a thoughtful second life.\nButton Text: Shop All Products",
  },
  {
    key: "our_story",
    label: "Our Story",
    pageName: "Our Story",
    defaultValue:
      "ReReNeWeD began with a simple belief: useful materials deserve a second life.\n\nWe partner with local recyclers, schools, and offices to rescue paper, plastic, and metal that would otherwise reach landfills, then transform them into beautiful stationery for everyday use.\n\nEvery pencil, notebook, and pen we sell keeps waste out of the environment and helps our customers make small, meaningful choices for the planet.",
  },
  {
    key: "sustainability",
    label: "Sustainability",
    pageName: "Sustainability",
    defaultValue:
      "Our Impact\n\nMaterials recovered: Tons of paper and plastic diverted from landfills each year.\nWater saved: Recycled paper production uses significantly less water than virgin paper.\nCarbon reduction: Local sourcing and minimal packaging keep our footprint small.\n\nHow We Source\n\nWe audit every supplier for ethical labor and environmental standards. Wherever possible we choose post-consumer waste over industrial scrap, so your purchase directly removes waste from communities.",
  },
  {
    key: "faq",
    label: "FAQ",
    pageName: "FAQ",
    defaultValue:
      "Q: Are all your products made from recycled materials?\nA: Most of our catalog uses recycled or upcycled content. Each product page shows the exact recycled percentage and origin.\n\nQ: Can I order in bulk for my office or school?\nA: Yes. Email us at hello@rerenewed.com for bulk pricing and customization.\n\nQ: How long does shipping take?\nA: Standard orders ship within 2 business days and arrive in 3-7 business days depending on your location.\n\nQ: What is your return policy?\nA: Unused items in original packaging can be returned within 30 days of delivery.",
  },
  {
    key: "shipping_info",
    label: "Shipping Info",
    pageName: "Shipping Info",
    defaultValue:
      "Shipping Rates\n\nStandard shipping is ₹99 for orders below ₹2,000 and free for orders above ₹2,000.\nDelivery Time\n\nOrders are processed within 1-2 business days. Most deliveries arrive within 3-7 business days for metro areas and 5-10 business days for remote locations.\nTracking\n\nYou will receive a tracking link by email and SMS once your order ships.",
  },
  {
    key: "returns_policy",
    label: "Returns Policy",
    pageName: "Returns Policy",
    defaultValue:
      "30-Day Returns\n\nIf you are not satisfied with your purchase, you may return unused items in original packaging within 30 days of delivery for a full refund or exchange.\n\nHow to Return\n\nContact us through your order page or email hello@rerenewed.com to request a return label. Once we receive the item in original condition, your refund will be processed within 5-7 business days.\n\nExceptions\n\nPersonalized or clearance items cannot be returned unless defective.",
  },
  {
    key: "privacy_policy",
    label: "Privacy Policy",
    pageName: "Privacy Policy",
    defaultValue:
      "Information We Collect\n\nWe collect information you provide when creating an account, placing an order, or contacting us. This includes your name, email, phone number, shipping address, and payment confirmation details.\n\nHow We Use Information\n\nWe use your information to process orders, communicate about shipments, and improve our services. We never sell your personal data.\n\nSecurity\n\nYour data is stored securely and access is restricted to authorized personnel only.",
  },
  {
    key: "terms_of_service",
    label: "Terms of Service",
    pageName: "Terms of Service",
    defaultValue:
      "Use of Site\n\nBy using ReReNeWeD, you agree to provide accurate account information and use the site only for lawful purposes.\n\nOrders and Payment\n\nAll prices are listed in INR and include applicable taxes. Payment must be completed before items are shipped.\n\nLimitation of Liability\n\nReReNeWeD is not liable for indirect damages arising from the use of our products beyond the purchase price of the item.",
  },
  {
    key: "contact_us",
    label: "Contact Us",
    pageName: "Contact Us",
    defaultValue:
      "Email: hello@rerenewed.com\nPhone: +91 98765 43210\nAddress: 12 Green Lane, Indiranagar, Bangalore, Karnataka 560038\nHours: Monday - Saturday, 10:00 AM - 6:00 PM IST",
  },
  {
    key: "footer_tagline",
    label: "Footer",
    pageName: "Footer",
    defaultValue:
      "Quality recycled goods for conscious consumers. Every purchase supports sustainable living.",
  },
];

export const ADMIN_CONTENT_DEFAULTS = Object.fromEntries(
  ADMIN_CONTENT_SECTIONS.map((section) => [section.key, section.defaultValue])
) as Record<string, string>;