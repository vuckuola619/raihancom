import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Printer, MonitorSmartphone, Projector, Radio, type LucideIcon } from "lucide-react";
import itemPabx from "@/assets/item-pabx.webp";
import itemPrinter from "@/assets/item-printer.webp";
import itemCpu from "@/assets/item-cpu.webp";
import itemProjector from "@/assets/item-projector.webp";
import itemHt from "@/assets/item-ht.webp";

type Slide = { src: string; name: string; tag: string; icon: LucideIcon };

const slides: Slide[] = [
  { src: itemPabx, name: "Panasonic PABX", tag: "Telepon kantor", icon: Phone },
  { src: itemPrinter, name: "Printer Kantor", tag: "Printer & fotokopi", icon: Printer },
  { src: itemCpu, name: "CPU / Desktop", tag: "Komputer kantor", icon: MonitorSmartphone },
  { src: itemProjector, name: "Proyektor", tag: "Meeting & presentasi", icon: Projector },
  { src: itemHt, name: "HT / Radio", tag: "Radio komunikasi", icon: Radio },
];

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 3200);
    return () => clearInterval(t);
  }, []);

  const current = slides[i];
  const Icon = current.icon;

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-[2rem] blur-2xl -z-10" />

      <div className="relative aspect-square w-full rounded-[1.5rem] border border-border/70 bg-gradient-to-br from-card to-background shadow-[0_30px_80px_-30px_rgba(13,42,148,0.4)] overflow-hidden">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* glow disc */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-primary/15 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.name}
            width={1024}
            height={1024}
            initial={{ opacity: 0, scale: 0.9, y: 16, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12, rotate: 2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 drop-shadow-[0_25px_35px_rgba(13,42,148,0.35)]"
          />
        </AnimatePresence>

        {/* label */}
        <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="card-surface !p-3 !rounded-xl flex items-center gap-3 pointer-events-auto"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground leading-none">{current.tag}</div>
                <div className="text-[13px] font-semibold leading-tight mt-1">{current.name}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {slides.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => setI(idx)}
                aria-label={`Tampilkan ${s.name}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
