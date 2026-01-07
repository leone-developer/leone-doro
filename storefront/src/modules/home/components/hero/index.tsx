"use client"

import Image from "next/image"
import { motion } from "motion/react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <Image
        src="/images/golden-hero.webp"
        alt="Leone D'Oro Jewelry"
        fill
        priority
        quality={90}
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 small:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          <h1 className="text-4xl small:text-6xl font-serif text-white leading-tight">
            Bijuterii de Lux pentru Momente Speciale
          </h1>
          <p className="text-xl small:text-2xl text-white/90 font-light">
            Descoperă colecția Leone D&apos;Oro
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <LocalizedClientLink
              href="/store"
              className="px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#C19B2B] transition-colors"
            >
              Descoperă Colecția
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-md border border-white/30 hover:bg-white/20 transition-colors"
            >
              Contactează-ne
            </LocalizedClientLink>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
