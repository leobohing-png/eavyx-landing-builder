import { NextResponse } from "next/server";
import { createSite } from "@/lib/store";
import { BrandStyle, SiteInput } from "@/lib/types";

const brandStyles: BrandStyle[] = ["Modern", "Luxury", "Friendly", "Minimal", "Bold"];

function normalizeServices(servicesRaw: string): string[] {
  return servicesRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | undefined>;
  const businessName = body.businessName?.trim() ?? "";
  const city = body.city?.trim() ?? "";
  const services = normalizeServices(body.services ?? "");
  const shortDescription = body.shortDescription?.trim() ?? "";
  const brandStyle = (body.brandStyle as BrandStyle) ?? "Modern";

  if (!businessName || !city || services.length === 0 || !brandStyles.includes(brandStyle)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (shortDescription.length > 200) {
    return NextResponse.json({ error: "Description too long" }, { status: 400 });
  }

  const payload: SiteInput = {
    businessName,
    city,
    services,
    brandStyle,
    shortDescription
  };

  const site = await createSite(payload);

  return NextResponse.json({ id: site.id }, { status: 201 });
}
