"use client";

import { Truck, Shield, RotateCcw, HeadphonesIcon, Gift } from "lucide-react";

const features = [
  { icon: Truck,           text: "شحن سريع للسعودية والخليج"    },
  { icon: Gift,            text: "تغليف هدايا مجاني"            },
  { icon: Shield,          text: "منتجات أصلية 100%"            },
  { icon: RotateCcw,       text: "إرجاع مجاني خلال 14 يوم"     },
  { icon: HeadphonesIcon,  text: "دعم عبر واتساب 24/7"          },
];

export function PromoStrip() {
  return (
    <section className="bg-gradient-to-l from-pink-600 to-rose-500 py-6 overflow-hidden">
      <div className="flex">
        {/* Two copies for infinite marquee effect */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-12 shrink-0 marquee-track"
            aria-hidden={copy === 1}
          >
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white whitespace-nowrap">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <f.icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">{f.text}</span>
                <span className="text-white/40 mx-4">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
