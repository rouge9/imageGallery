import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";

export default function Home() {
  return (
    <main className="px-4 bg-no-repeat bg-cover bg-center bg-custom-background-mobile md:bg-custom-background-tablet lg:bg-custom-background">
      <Header />
      <Hero />
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
        <img
          src="/assets/img/jivePhones.png"
          alt="Jive QR Code"
          width={800}
          height={600}
          className="rounded-2xl"
        />
      </section>
      <Features />
      <Footer />
    </main>
  );
}
