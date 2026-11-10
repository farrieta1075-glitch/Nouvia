import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { InquiryRecord } from "@/lib/inquiry";

const filePath = path.join(process.cwd(), "data", "inquiries.json");

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

function isRecord(value: unknown): value is InquiryRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<InquiryRecord>;
  return typeof record.id === "string" && typeof record.email === "string";
}

async function readAll(): Promise<InquiryRecord[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed.filter(isRecord) : [];
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") return [];
    if (error instanceof SyntaxError) return [];
    throw error;
  }
}

export async function saveInquiry(record: InquiryRecord): Promise<"saved" | "limited"> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const current = await readAll();
  const now = Date.now();
  const recent = current.filter((item) => {
    const created = Date.parse(item.createdAt);
    return item.email.toLowerCase() === record.email.toLowerCase() && Number.isFinite(created) && now - created < 60_000;
  });
  if (recent.length >= 2) return "limited";
  current.push(record);
  await writeFile(filePath, JSON.stringify(current, null, 2), "utf8");
  return "saved";
}
