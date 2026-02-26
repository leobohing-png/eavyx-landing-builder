import { promises as fs } from "fs";
import path from "path";
import { GeneratedSite, SiteInput } from "./types";

const dataFilePath = path.join(process.cwd(), "data", "sites.json");

async function readSites(): Promise<GeneratedSite[]> {
  try {
    const raw = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(raw) as GeneratedSite[];
  } catch {
    return [];
  }
}

async function writeSites(sites: GeneratedSite[]) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(sites, null, 2), "utf-8");
}

export async function createSite(input: SiteInput): Promise<GeneratedSite> {
  const sites = await readSites();
  const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newSite: GeneratedSite = {
    id,
    createdAt: new Date().toISOString(),
    input
  };

  sites.push(newSite);
  await writeSites(sites);

  return newSite;
}

export async function getSiteById(id: string): Promise<GeneratedSite | null> {
  const sites = await readSites();
  return sites.find((site) => site.id === id) ?? null;
}
