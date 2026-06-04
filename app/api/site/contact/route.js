import { NextResponse } from "next/server";
import { getSiteContact } from "@/lib/site/contact";

export const runtime = "nodejs";

export async function GET() {
  const contact = await getSiteContact();
  return NextResponse.json({ contact });
}
