"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { ContactForm } from "@/components/contact-form";
import { MobileNav } from "@/components/mobile-nav";
import { ModelViewer } from "@/components/model-viewer";
import { FeaturedVideoSection } from "@/components/youtube-player";
import { ImageLightbox } from "@/components/image-lightbox";
import { useInView } from "@/hooks/use-in-view";
import type { SiteContent } from "@/lib/content";

const products3D = [
  {
    src: "/images/products/sunglasses.webp",
    alt: "Luxury Sunglasses Collection",
    title: "Luxury Sunglasses",
    description: "Premium eyewear visualization",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/face-serum-nature.webp",
    alt: "Face Serum in Natural Setting",
    title: "Natural Skincare",
    description: "Organic product visualization",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/diamond-ring.png",
    alt: "Diamond Engagement Ring",
    title: "Diamond Jewelry",
    description: "Luxury ring visualization",
    colSpan: "md:col-span-2",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/face-serum-rose.jpeg",
    alt: "Face Serum with Rose",
    title: "Luxury Skincare",
    description: "Premium beauty product",
    colSpan: "md:col-span-2",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/hair-spray.jpeg",
    alt: "Hair Care Spray",
    title: "Organic Hair Care",
    description: "Natural hair product visualization",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/face-serum-hand.jpeg",
    alt: "Face Serum in Hand",
    title: "Skincare Application",
    description: "Product usage visualization",
    aspectRatio: "h-full",
  },
];

const modelingProducts = [
  {
    src: "/images/products/headphones-render.jpeg",
    alt: "Premium Headphones Render",
    title: "Premium Headphones",
    description:
      "Photorealistic render of wireless over-ear headphones with premium materials and branding",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/headphones-wireframe.jpeg",
    alt: "Headphones 3D Wireframe Model",
    title: "3D Wireframe Modeling",
    description:
      "Technical 3D mesh modeling showing the polygon structure used for precise product design",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/smartwatch-exploded-color.jpeg",
    alt: "Smartwatch Exploded View",
    title: "Smartwatch Component Design",
    description:
      "Exploded view showing internal components and assembly of a modern smartwatch",
    aspectRatio: "h-full",
  },
  {
    src: "/images/products/smartwatch-exploded-clay.jpeg",
    alt: "Smartwatch Clay Model Exploded View",
    title: "Product Prototyping",
    description:
      "Clay model rendering showing the design process for wearable technology",
    colSpan: "md:col-span-2",
    aspectRatio: "h-full",
  },
];

const gifItems = [
  {
    src: "https://wn33l2wud8bxcspj.public.blob.vercel-storage.com/revision%20gif-min.gif",
    alt: "Product Visualization",
    colSpan: "col-span-2",
    rowSpan: "row-span-2",
  },
  {
    src: "https://wn33l2wud8bxcspj.public.blob.vercel-storage.com/gummies%20gif-min.gif",
    alt: "Abstract Stone Animation",
    colSpan: "col-span-1",
    rowSpan: "",
  },
  {
    src: "https://wn33l2wud8bxcspj.public.blob.vercel-storage.com/bleter%20x%20grass%20grow%20gif-min.gif",
    alt: "Technical Design Animation",
    colSpan: "col-span-1",
    rowSpan: "",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ezgif-35953cdeaefbd2-ed8njGH6Rgvl4d5U9NhTgKq6TjA0c6.gif",
    alt: "Package Design",
    colSpan: "col-span-2",
    rowSpan: "",
  },
];

interface HomeSectionsProps {
  content: SiteContent;
}

export function HomeSections({ content }: HomeSectionsProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero — fires on mount
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0, triggerOnce: true });

  // Section headings
  const [animHeadRef, animHeadInView] = useInView<HTMLDivElement>();
  const [magicHeadRef, magicHeadInView] = useInView<HTMLDivElement>();
  const [projectsHeadRef, projectsHeadInView] = useInView<HTMLDivElement>();
  const [modelingHeadRef, modelingHeadInView] = useInView<HTMLDivElement>();
  const [servicesHeadRef, servicesHeadInView] = useInView<HTMLDivElement>();
  const [contactHeadRef, contactHeadInView] = useInView<HTMLDivElement>();

  // GIF grid
  const [gifGridRef, gifGridInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  // Services section
  const [servicesRef, servicesInView] = useInView<HTMLElement>({ threshold: 0.05 });

  // Contact section
  const [contactRef, contactInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={`container mx-auto py-4 px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-scrolled" : "bg-black/80 backdrop-blur-sm"
        }`}
      >
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
          >
            CgSalih.com
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#About" className="hover:text-pink-400 transition-colors">About</Link>
            <Link href="#services" className="hover:text-pink-400 transition-colors">Services</Link>
            <Link href="#contact" className="hover:text-pink-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="#contact">
              <Button className="hidden md:flex bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                Hire Me
              </Button>
            </Link>
            <MobileNav />
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        className="container mx-auto px-4 md:px-6 py-12 md:py-24"
        id="About"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div
              className={`space-y-2 stagger-item ${heroInView ? "stagger-visible" : ""}`}
              style={{ "--stagger-delay": "0ms" } as React.CSSProperties}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">{content.hero.headline1}</span>
                <span className="block">{content.hero.headline2}</span>
              </h1>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                {content.hero.subtitle}
              </p>
            </div>
            <div
              className={`flex space-x-4 stagger-item ${heroInView ? "stagger-visible" : ""}`}
              style={{ "--stagger-delay": "80ms" } as React.CSSProperties}
            >
              <Link href="#contact">
                <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                  {content.hero.ctaText}
                </Button>
              </Link>
            </div>
            <div
              className={`pt-6 md:pt-8 stagger-item ${heroInView ? "stagger-visible" : ""}`}
              style={{ "--stagger-delay": "160ms" } as React.CSSProperties}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
                {content.hero.bio}
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                {content.hero.bioDetail}
              </p>
            </div>
          </div>
          <div
            className={`relative h-[350px] md:h-[520px] flex justify-center mt-4 md:mt-0 reveal reveal-slide-left ${heroInView ? "reveal-visible" : ""}`}
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            <div className="w-full h-full max-w-[380px] md:max-w-[520px] glass-card rounded-lg overflow-hidden">
              <ModelViewer
                modelPath={content.model.path}
                position={[
                  content.model.positionX,
                  content.model.positionY,
                  content.model.positionZ,
                ]}
                scale={content.model.scale}
                cameraZ={content.model.cameraZ}
                cameraFov={content.model.cameraFov}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3D Animations */}
      <section id="portfolio" className="container mx-auto px-4 md:px-6 py-16">
        <div
          ref={animHeadRef}
          className={`space-y-2 mb-8 reveal reveal-fade-up ${animHeadInView ? "reveal-visible" : ""}`}
        >
          <h2 className="text-3xl font-bold">3D Animations</h2>
          <p className="text-gray-400">
            Bringing products to life with fluid motion and cinematic quality
            for commercials and social media
          </p>
        </div>

        <div className="space-y-12">
          <FeaturedVideoSection />

          <div className="space-y-6">
            <div
              ref={magicHeadRef}
              className={`space-y-2 reveal reveal-fade-up ${magicHeadInView ? "reveal-visible" : ""}`}
            >
              <h2 className="text-2xl font-bold">Lets make magic</h2>
            </div>

            <div className="w-full">
              <div
                ref={gifGridRef}
                className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-4"
              >
                {gifItems.map((item, index) => (
                  <div
                    key={item.src}
                    className={`glass-card rounded-lg overflow-hidden stagger-item ${item.colSpan} ${item.rowSpan} ${gifGridInView ? "stagger-visible" : ""}`}
                    style={{ "--stagger-delay": `${index * 80}ms` } as React.CSSProperties}
                  >
                    <div className="relative h-full">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Products */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div
          ref={projectsHeadRef}
          className={`space-y-2 mb-8 reveal reveal-fade-up ${projectsHeadInView ? "reveal-visible" : ""}`}
        >
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-gray-400">
            Photorealistic 3D models and still renders that showcase your
            products in their best light
          </p>
        </div>
        <ImageLightbox
          images={products3D}
          gridClassName="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4"
        />
      </section>

      {/* Product Design Modeling */}
      <section className="container mx-auto px-4 md:px-6 py-16 from-transparent to-gray-900 rounded-3xl">
        <div
          ref={modelingHeadRef}
          className={`space-y-2 mb-8 text-center reveal reveal-fade-up ${modelingHeadInView ? "reveal-visible" : ""}`}
        >
          <h2 className="text-3xl font-bold">Product Design Modeling</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From concept to final render, I create detailed 3D models for
            product visualization, prototyping, and manufacturing
          </p>
        </div>
        <ImageLightbox
          images={modelingProducts}
          gridClassName="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-6 mt-12"
          textOverlay
        />
      </section>

      {/* Services */}
      <section
        ref={servicesRef}
        id="services"
        className="container mx-auto px-4 md:px-6 py-8 md:py-12"
      >
        <div
          ref={servicesHeadRef}
          className={`space-y-2 mb-8 text-center reveal reveal-fade-up ${servicesHeadInView ? "reveal-visible" : ""}`}
        >
          <h2 className="text-3xl font-bold">Services</h2>
          <p className="text-gray-400">
            Professional 3D visualization services tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-3 md:gap-4">
          {content.services.map((s, index) => (
            <div
              key={s.id}
              className={`stagger-item ${
                index === 0
                  ? "col-span-2 row-span-2 h-full"
                  : index === content.services.length - 1
                    ? "col-span-2 h-full"
                    : "col-span-1 h-full"
              } ${servicesInView ? "stagger-visible" : ""}`}
              style={{ "--stagger-delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <ServiceCard
                image={s.image}
                alt={s.title}
                title={s.title}
                description={s.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        ref={contactRef}
        id="contact"
        className="container mx-auto px-4 md:px-6 py-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div
            className={`space-y-6 stagger-item ${contactInView ? "stagger-visible" : ""}`}
            style={{ "--stagger-delay": "0ms" } as React.CSSProperties}
          >
            <div ref={contactHeadRef}>
              <h2 className="text-3xl font-bold pb-4">Get in touch</h2>
              <p className="text-gray-400">
                Ready to bring your products to life? Let&apos;s discuss your
                project and create something amazing together.
              </p>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/profile-photo.jpeg"
                  alt="3D Artist Portrait"
                  width={400}
                  height={500}
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-medium">
                    Let&apos;s create something amazing together
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`stagger-item ${contactInView ? "stagger-visible" : ""}`}
            style={{ "--stagger-delay": "120ms" } as React.CSSProperties}
          >
            <ContactForm />
          </div>

          <div className="flex flex-row gap-4 md:col-span-2">
            {[
              {
                href: "https://www.instagram.com/cgsalih",
                label: "Instagram",
                icon: Instagram,
                iconBg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
                delay: 200,
              },
              {
                href: "https://x.com/cgsalih",
                label: "X",
                icon: Twitter,
                iconBg: "bg-black",
                delay: 280,
              },
              {
                href: "https://www.youtube.com/@cgsalih",
                label: "YouTube",
                icon: Youtube,
                iconBg: "bg-red-600",
                delay: 360,
              },
            ].map(({ href, label, icon: Icon, iconBg, delay }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card hover:border-white/25 hover:shadow-2xl rounded-lg p-4 transition-all duration-300 flex flex-col items-center text-center group flex-1 stagger-item ${contactInView ? "stagger-visible" : ""}`}
                style={{ "--stagger-delay": `${delay}ms` } as React.CSSProperties}
              >
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium mb-1">{label}</h3>
                <span className="text-pink-400 text-sm group-hover:underline">@cgsalih</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-6 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              CgSalih
            </h3>
            <p className="text-gray-400 text-sm">
              Professional 3D visualization services for products, commercials,
              and social media content.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {content.services.map((s) => (
                <li key={s.id}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{content.contact.email}</li>
              <li>{content.contact.phone}</li>
              <li>{content.contact.location}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/cgsalih"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@cgsalih"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://x.com/cgsalih"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
