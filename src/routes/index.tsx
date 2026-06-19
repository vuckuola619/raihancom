import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Phone,
  Printer,
  MonitorSmartphone,
  Projector,
  Radio,
  Boxes,
  PackageOpen,
  MessageCircle,
  Camera,
  MapPin,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { Card3D } from "@/components/Card3D";
import rcLogo from "@/assets/rc-logo-optimized.webp";
import {
  waLink,
  WA_PRIMARY,
  WA_SECONDARY,
  WA_PRIMARY_DISPLAY,
  WA_SECONDARY_DISPLAY,
} from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raihan Com — Menerima Alat Bekas Kantor Jakarta & Jabodetabek" },
      {
        name: "description",
        content:
          "Raihan Com menerima alat bekas kantor di wilayah Jakarta, Bogor, Depok, Tangerang, Bekasi (Jabodetabek). PABX Panasonic, printer, CPU, proyektor, HT. Pengambilan langsung di lokasi.",
      },
      {
        name: "keywords",
        content:
          "alat bekas kantor Jakarta, menerima alat kantor bekas, jual PABX bekas Tangerang, printer bekas Bekasi, CPU bekas Depok, proyektor bekas, HT bekas, radio komunikasi bekas, Raihan Com, borongan alat kantor Jabodetabek",
      },
      {
        property: "og:title",
        content: "Raihan Com — Menerima Alat Bekas Kantor Jakarta & Jabodetabek",
      },
      {
        property: "og:description",
        content:
          "Tawarkan perangkat kantor bekas Anda (PABX Panasonic, printer, CPU, proyektor, HT) ke Raihan Com. Pengambilan on-site langsung di wilayah Jabodetabek.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "theme-color", content: "#1D4ED8" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Raihan Com",
          description:
            "Raihan Com menerima alat bekas kantor seperti Panasonic PABX, printer, CPU, proyektor, HT / radio komunikasi, dan perangkat elektronik kantor lain untuk wilayah Jakarta & Jabodetabek.",
          telephone: "+628567578388",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jakarta",
            addressRegion: "DKI Jakarta",
            addressCountry: "ID",
          },
          areaServed: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi", "Jabodetabek"],
        }),
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  { icon: Phone, name: "Panasonic PABX", desc: "Perangkat PABX Panasonic & telepon kantor." },
  {
    icon: Printer,
    name: "Printer / Fotokopi",
    desc: "Printer kantor, mesin cetak, dan sejenisnya.",
  },
  {
    icon: MonitorSmartphone,
    name: "CPU / Desktop",
    desc: "CPU komputer dan desktop tower kantor.",
  },
  { icon: Projector, name: "Proyektor", desc: "Proyektor untuk meeting & presentasi." },
  { icon: Radio, name: "HT / Radio Komunikasi", desc: "HT, radio, perangkat komunikasi kantor." },
  {
    icon: PackageOpen,
    name: "Elektronik Kantor Lain",
    desc: "Perangkat lain — kirim foto untuk dicek.",
  },
  { icon: Boxes, name: "Rak Perangkat Elektronik", desc: "Rak & unit perangkat elektronik bekas." },
];

const steps = [
  {
    icon: Camera,
    title: "Kirim Foto Barang",
    desc: "Foto unit beberapa sisi, merek, tipe & jumlah.",
  },
  {
    icon: ClipboardList,
    title: "Tulis Kondisi Singkat",
    desc: "Menyala, mati, bekas pakai, atau belum dicek.",
  },
  {
    icon: MapPin,
    title: "Sampaikan Lokasi",
    desc: "Membantu pengecekan & pengaturan pengambilan.",
  },
  {
    icon: MessageCircle,
    title: "Lanjut via WhatsApp",
    desc: "Tim Raihan Com akan merespons langsung via WA.",
  },
];

const faqs = [
  {
    q: "Apakah Raihan Com menerima PABX Panasonic?",
    a: "Ya, kami menerima Panasonic PABX dan perangkat telepon kantor terkait.",
  },
  {
    q: "Apakah bisa menawarkan printer atau CPU bekas?",
    a: "Bisa. Kirim foto, jumlah unit, merek / tipe, dan kondisi lewat WhatsApp.",
  },
  {
    q: "Apakah menerima proyektor dan HT?",
    a: "Ya, kami menerima proyektor, HT, radio komunikasi, dan perangkat sejenis.",
  },
  {
    q: "Bagaimana kalau barang saya tidak ada di daftar?",
    a: "Tetap kirim foto dan detail barang lewat WhatsApp untuk pengecekan.",
  },
  {
    q: "Apa saja informasi yang perlu dikirim?",
    a: "Jenis barang, jumlah, kondisi, lokasi, dan foto barang.",
  },
  {
    q: "Apakah ada form di website?",
    a: "Tidak. Komunikasi langsung lewat WhatsApp agar lebih cepat.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.555 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.49-8.413z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

function HomePage() {
  const primaryHref = waLink(WA_PRIMARY);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const [heroTab, setHeroTab] = useState<"card" | "slider">("card");
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = ["top", "layanan", "kategori", "wilayah-layanan", "proses", "kontak", "faq"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyText = () => {
    const text = `Halo Raihan Com, saya ingin menanyakan alat bekas kantor.
Jenis barang :
Jumlah        :
Kondisi       :
Lokasi        :
Saya bisa kirim foto barang.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Format pesan berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Floating Capsule Navbar */}
      <header className={`navbar-capsule transition-all duration-300 ${
        mobileMenuOpen ? "rounded-[2rem] py-5 px-6" : "rounded-full py-2.5 px-6"
      }`}>
        <div className="flex items-center justify-between w-full">
          <a href="#top" className="flex items-center gap-2 z-50">
            <img src={rcLogo} alt="" className="w-8 h-8 object-contain" width={32} height={32} />
            <span className="font-semibold tracking-tight text-[15px] text-ink dark:text-white">
              Raihan <span className="gradient-text">Com</span>
            </span>
          </a>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            {[
              ["Layanan", "#layanan", "layanan"],
              ["Kategori", "#kategori", "kategori"],
              ["Wilayah", "#wilayah-layanan", "wilayah-layanan"],
              ["Proses", "#proses", "proses"],
              ["Kontak", "#kontak", "kontak"],
              ["FAQ", "#faq", "faq"],
            ].map(([label, href, sectionId]) => (
              <a
                key={href}
                href={href}
                className={`navbar-link-pill text-[13px] ${
                  activeSection === sectionId
                    ? "navbar-link-active-pill text-primary"
                    : "hover:text-foreground text-muted-foreground"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2 z-50">
            {/* Desktop CTA Button */}
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener"
              className="hidden md:flex btn-cyan-gradient py-2 px-5 text-[13px] items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-ink dark:text-white hover:bg-muted/40 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2.5 mt-4 pt-3 border-t border-border/40 w-full animate-in slide-in-from-top-4 duration-200">
            {[
              ["Layanan", "#layanan", "layanan"],
              ["Kategori", "#kategori", "kategori"],
              ["Wilayah", "#wilayah-layanan", "wilayah-layanan"],
              ["Proses", "#proses", "proses"],
              ["Kontak", "#kontak", "kontak"],
              ["FAQ", "#faq", "faq"],
            ].map(([label, href, sectionId]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all ${
                  activeSection === sectionId
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-cyan-gradient w-full justify-center py-2.5 text-[14px] flex items-center gap-1.5 mt-1"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 hero-glow" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-page relative pt-28 pb-16 md:pt-36 md:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="chip"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                <span className="relative rounded-full bg-primary w-2 h-2" />
              </span>
              Menerima alat bekas kantor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-[34px] leading-[1.05] sm:text-[42px] md:text-[56px] md:leading-[1.02] font-semibold tracking-tight"
            >
              Jual alat kantor bekas Anda <span className="gradient-text">cepat & mudah</span> ke
              Raihan Com
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-[15px] md:text-[17px] leading-[1.7] text-muted-foreground max-w-xl"
            >
              Kami menerima Panasonic PABX, printer, CPU, proyektor, HT / radio komunikasi, dan
              perangkat elektronik kantor lainnya. Cukup kirim foto via WhatsApp — proses singkat,
              respons cepat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a href={primaryHref} target="_blank" rel="noopener" className="btn-primary">
                <WhatsAppIcon className="w-4 h-4" />
                Hubungi via WhatsApp
              </a>
              <a href="#kategori" className="btn-ghost">
                Lihat kategori
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-muted-foreground"
            >
              {(
                [
                  { Icon: ShieldCheck, text: "Komunikasi langsung dengan tim Raihan Com" },
                  { Icon: Zap, text: "Respons cepat via WhatsApp" },
                  { Icon: Sparkles, text: "Bisa satuan atau beberapa unit" },
                ] as const
              ).map(({ Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex flex-col gap-4"
          >
            {/* View Selector Tabs */}
            <div className="flex bg-muted/60 p-1 rounded-full border border-border/80 self-center z-10">
              <button
                onClick={() => setHeroTab("card")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  heroTab === "card"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Interactive 3D Card
              </button>
              <button
                onClick={() => setHeroTab("slider")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  heroTab === "slider"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Photo Gallery
              </button>
            </div>

            {/* Selected View */}
            <div className="w-full relative min-h-[350px]">
              {heroTab === "card" ? (
                <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-300">
                  <Card3D />
                </div>
              ) : (
                <div className="w-full animate-in fade-in zoom-in-95 duration-300">
                  <HeroSlider />

                  {/* Floating stat cards (Only in Photo Gallery view to avoid layout overlap with 3D card) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hidden sm:flex absolute -left-4 top-8 card-surface !p-3 items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-wa/10 text-wa grid place-items-center">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground">Online sekarang</div>
                      <div className="text-[13px] font-semibold">Tim Raihan Com</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden sm:flex absolute -right-2 bottom-6 card-surface !p-3 items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground">7+ kategori</div>
                      <div className="text-[13px] font-semibold">Alat kantor diterima</div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee strip */}
      <div className="border-y border-border/70 bg-card/50">
        <div className="container-page py-4 flex items-center gap-3 overflow-hidden">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold flex-shrink-0">
            Kategori
          </span>
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              {[...categories, ...categories].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <c.icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                  {c.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Layanan */}
      <Section id="layanan">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">Layanan</span>
          <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">
            Solusi untuk merapikan perangkat kantor lama
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Cocok untuk kantor, toko, gudang, teknisi, atau pengelola aset. Komunikasi langsung,
            tanpa form panjang.
          </p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: PackageOpen,
              title: "Terima Perangkat Kantor",
              desc: "PABX, printer, CPU, proyektor, HT, radio, dan elektronik kantor lainnya.",
            },
            {
              icon: MessageCircle,
              title: "Komunikasi Langsung",
              desc: "Hubungi tim Raihan Com via WhatsApp untuk kirim foto & detail unit.",
            },
            {
              icon: Boxes,
              title: "Satuan atau Banyak Unit",
              desc: "Sampaikan daftar barang agar pengecekan lebih cepat dan jelas.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-surface card-interactive"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-brand-deep text-white grid place-items-center shadow-brand">
                <s.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 font-semibold text-[17px]">{s.title}</h3>
              <p className="mt-1.5 text-[14px] text-muted-foreground leading-[1.6]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Kategori */}
      <Section id="kategori" className="bg-card/40 border-y border-border/70">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">Kategori</span>
          <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">
            Barang yang diterima Raihan Com
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Diambil dari kartu nama resmi & objek perangkat yang biasa ditangani.
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-surface card-interactive group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-accent text-primary grid place-items-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <c.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.14em] text-muted-foreground/70">
                    0{i + 1}
                  </div>
                  <h3 className="mt-0.5 font-semibold text-[15px] leading-tight">{c.name}</h3>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-[1.55]">
                    {c.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-7 text-sm text-muted-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Barang tidak ada di daftar? Tetap kirim foto via WhatsApp untuk dicek.
        </p>
      </Section>

      {/* Wilayah Layanan (Local SEO) */}
      <Section id="wilayah-layanan" className="bg-muted/15 border-y border-border/70">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">Wilayah Layanan</span>
          <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">
            Melayani area Jakarta & seluruh Jabodetabek
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Kami melayani pengambilan langsung di tempat (on-site pickup) untuk wilayah berikut. Tim
            Raihan Com akan datang untuk memborong dan mengangkut peralatan kantor bekas Anda:
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { city: "Jakarta", areas: "Pusat, Barat, Timur, Utara, Selatan." },
            { city: "Bogor", areas: "Kota Bogor, Cibinong, Sentul, dll." },
            { city: "Depok", areas: "Margonda, Cinere, Cimanggis, Sawangan." },
            { city: "Tangerang", areas: "Tangerang Kota, BSD, Serpong, Bintaro." },
            { city: "Bekasi", areas: "Kota Bekasi, Tambun, Cikarang, dll." },
          ].map((item, idx) => (
            <motion.div
              key={item.city}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="card-surface !p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold text-sm">
                {item.city.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-4 font-semibold text-[16px]">{item.city}</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">{item.areas}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-card border border-border/80 text-sm text-muted-foreground max-w-xl flex items-start gap-2.5">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span>
            Pengambilan di luar Jabodetabek untuk jumlah borongan/partai besar dapat dinegosiasikan
            terlebih dahulu melalui chat WhatsApp.
          </span>
        </div>
      </Section>

      {/* Proses */}
      <Section id="proses">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">Proses</span>
          <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">Cara menawarkan barang</h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Empat langkah singkat, langsung dari WhatsApp Anda.
          </p>
        </motion.div>

        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card-surface card-interactive relative"
            >
              <div className="absolute -top-3 left-5 px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-bold tracking-wider">
                STEP {i + 1}
              </div>
              <div className="mt-2 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-brand-deep text-white grid place-items-center">
                <s.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 font-semibold text-[16px]">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-[1.6]">{s.desc}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10">
          <a href={primaryHref} target="_blank" rel="noopener" className="btn-primary">
            <WhatsAppIcon className="w-4 h-4" />
            Kirim detail barang sekarang
          </a>
        </div>
      </Section>

      {/* Kontak */}
      <Section id="kontak" className="bg-card/40 border-y border-border/70">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Kontak</span>
            <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">Hubungi Raihan Com</h2>
            <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7] max-w-lg">
              Kirim foto barang, kondisi, jumlah unit, dan lokasi melalui WhatsApp. Tim Raihan Com
              akan merespons langsung.
            </p>

            <div className="mt-7 card-surface space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-brand-deep text-white grid place-items-center font-semibold text-[15px]">
                    RC
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-wa border-2 border-card" />
                </div>
                <div>
                  <div className="font-semibold">Tim Raihan Com</div>
                  <div className="text-[13px] text-muted-foreground">WhatsApp · Online & Aktif</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href={waLink(WA_PRIMARY)}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary w-full justify-center !py-2.5 text-[14px]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chat WA 1: {WA_PRIMARY_DISPLAY}
                </a>
                <a
                  href={waLink(WA_SECONDARY)}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary w-full justify-center !py-2.5 !bg-accent !text-primary hover:!bg-primary hover:!text-white border border-primary/25 text-[14px]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chat WA 2: {WA_SECONDARY_DISPLAY}
                </a>
              </div>
              <p className="text-[12px] text-muted-foreground text-center">
                Silakan hubungi salah satu nomor di atas untuk penawaran cepat.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Format pesan disarankan</div>
                <button
                  onClick={handleCopyText}
                  className="chip !py-1 !px-2.5 !text-[11px] hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copied ? "Tersalin!" : "Salin Format"}
                </button>
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                Gunakan format ini agar pengecekan lebih mudah:
              </p>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-muted/70 border border-border p-4 text-[13.5px] leading-[1.7] font-sans text-foreground">
                {`Halo Raihan Com, saya ingin menanyakan alat bekas kantor.
Jenis barang :
Jumlah        :
Kondisi       :
Lokasi        :
Saya bisa kirim foto barang.`}
              </pre>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="section-label">FAQ</span>
            <h2 className="mt-3 text-[26px] md:text-[36px] leading-[1.1]">
              Pertanyaan yang sering ditanyakan
            </h2>
          </motion.div>

          <div className="mt-10 space-y-2.5">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group card-surface !p-0 overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-4 font-medium text-[15px]">
                  <span>{f.q}</span>
                  <span className="w-7 h-7 flex-shrink-0 rounded-full bg-accent text-primary grid place-items-center transition-transform group-open:rotate-45 text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 md:px-5 pb-5 text-[14px] text-muted-foreground leading-[1.7]">
                  {f.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[1.75rem] overflow-hidden p-8 md:p-14 text-white"
          style={{ background: "linear-gradient(135deg, #0B1B3B 0%, #1D4ED8 100%)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-primary/40 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="chip !bg-white/10 !text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              Siap menerima penawaran Anda
            </div>
            <h2 className="mt-5 text-[28px] md:text-[44px] leading-[1.08] font-semibold text-white">
              Punya alat bekas kantor yang ingin ditawarkan?
            </h2>
            <p className="mt-4 text-white/70 leading-[1.7] text-[15px]">
              Kirim foto dan detail barang ke Raihan Com via WhatsApp. Sertakan jenis barang,
              jumlah, kondisi, dan lokasi — kami akan respons langsung.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={primaryHref} target="_blank" rel="noopener" className="btn-primary">
                <WhatsAppIcon className="w-4 h-4" />
                Chat WhatsApp
              </a>
              <a
                href="#proses"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Lihat cara kerjanya
              </a>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container-page grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={rcLogo} alt="" className="w-8 h-8" width={32} height={32} />
              <span className="font-semibold">Raihan Com</span>
            </div>
            <p className="mt-3 text-[13.5px] text-muted-foreground max-w-xs">
              Menerima alat-alat bekas kantor. Komunikasi langsung via WhatsApp.
            </p>
          </div>
          <div className="text-[13.5px]">
            <div className="font-semibold text-foreground">Kontak WhatsApp</div>
            <div className="mt-2 space-y-1.5 text-muted-foreground">
              <div>
                <a
                  href={waLink(WA_PRIMARY)}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-primary inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WA 1: {WA_PRIMARY_DISPLAY}
                </a>
              </div>
              <div>
                <a
                  href={waLink(WA_SECONDARY)}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-primary inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WA 2: {WA_SECONDARY_DISPLAY}
                </a>
              </div>
            </div>
          </div>
          <div className="text-[13.5px]">
            <div className="font-semibold text-foreground">Navigasi</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
              <a href="#layanan" className="hover:text-primary">
                Layanan
              </a>
              <a href="#kategori" className="hover:text-primary">
                Kategori
              </a>
              <a href="#wilayah-layanan" className="hover:text-primary">
                Wilayah
              </a>
              <a href="#proses" className="hover:text-primary">
                Proses
              </a>
              <a href="#kontak" className="hover:text-primary">
                Kontak
              </a>
              <a href="#faq" className="hover:text-primary">
                FAQ
              </a>
            </div>
          </div>
        </div>
        <div className="container-page mt-8 pt-5 border-t border-border text-[12px] text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© Raihan Com. Semua hak cipta dilindungi.</span>
          <span>Made for honest used office equipment trading.</span>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener"
        className="md:hidden fixed bottom-4 left-4 right-4 z-50 btn-primary shadow-2xl"
      >
        <WhatsAppIcon className="w-4 h-4" />
        Chat WhatsApp Raihan Com
      </a>

      {/* Desktop floating WA */}
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp Raihan Com"
        className="hidden md:grid fixed bottom-6 right-6 z-50 w-14 h-14 place-items-center rounded-full bg-wa text-white shadow-wa hover:bg-wa-hover transition-colors pulse-ring"
      >
        <WhatsAppIcon className="w-6 h-6 relative" />
      </a>
    </div>
  );
}
