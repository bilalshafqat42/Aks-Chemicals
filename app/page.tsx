import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Figures from "@/components/Figures";
import Production from "@/components/Production";
import About from "@/components/About";
import Ranges from "@/components/Ranges";
import Pull from "@/components/Pull";
import Beyond from "@/components/Beyond";
import Toll from "@/components/Toll";
import Standards from "@/components/Standards";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Figures />
        <Production />
        <About />
        <Ranges />
        <Pull />
        <Beyond />
        <Toll />
        <Standards />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
