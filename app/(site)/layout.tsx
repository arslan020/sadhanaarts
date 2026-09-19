import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <>
      <Header siteName={content.site.name} />
      {children}
      <Footer site={content.site} contact={content.contact} />
    </>
  );
}
