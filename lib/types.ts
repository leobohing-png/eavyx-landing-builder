export type BrandStyle = "Modern" | "Luxury" | "Friendly" | "Minimal" | "Bold";

export interface SiteInput {
  businessName: string;
  city: string;
  services: string[];
  brandStyle: BrandStyle;
  shortDescription?: string;
}

export interface GeneratedSite {
  id: string;
  createdAt: string;
  input: SiteInput;
}
