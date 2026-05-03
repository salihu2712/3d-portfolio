import { getContent } from "@/lib/content";
import { HomeSections } from "@/components/home-sections";

export default async function Home() {
  const content = getContent();
  return <HomeSections content={content} />;
}
