import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PromoStrip } from "@/components/home/promo-strip";
import { InstallmentBanner } from "@/components/home/installment-banner";
import { WhatsAppBanner } from "@/components/home/whatsapp-banner";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فلورا ستور | إكسسوارات، هدايا، وعطور فاخرة",
  description: "اكتشفي أجمل الإكسسوارات، الهدايا الفاخرة، والعطور المميزة في متجر فلورا. شحن سريع لجميع مناطق المملكة والخليج.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PromoStrip />
      <FeaturedProducts />
      <InstallmentBanner />
      <TestimonialsSection />
      <WhatsAppBanner />
    </>
  );
}
