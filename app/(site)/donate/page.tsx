import { redirect } from "next/navigation";
import { donateHref } from "@/lib/content";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DonateRedirectPage() {
  const { support } = await getContent();
  redirect(donateHref(support.donateUrl || support.payItForward?.cta.href));
}
