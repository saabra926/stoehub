import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { getSiteContact, updateSiteContact } from "@/lib/site/contact";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) {
      return response;
    }

    const contact = await getSiteContact();
    return NextResponse.json({ contact });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not load contact settings." }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) {
      return response;
    }

    const body = await request.json();
    const result = await updateSiteContact(body);

    if (!result.ok) {
      return NextResponse.json({ message: "Please fix the highlighted fields.", errors: result.errors }, { status: 400 });
    }

    return NextResponse.json({
      message: "Contact information updated.",
      contact: result.contact,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not update contact settings." }, { status: 500 });
  }
}
