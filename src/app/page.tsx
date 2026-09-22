import { DemoFiscal } from "@/components/demo-fiscal";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sobre } from "@/components/sobre";

export default function Home() {
  return (
    <div className="w-full bg-canvas">
      <SiteHeader />
      <Hero />
      <Sobre />
      <DemoFiscal />
      <SiteFooter />
    </div>
  );
}
