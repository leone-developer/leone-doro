import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconTruckDelivery,
  IconGift,
  IconCertificate,
  IconBrandTiktok,
} from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-[#D4AF37]/30 pt-16 pb-8">
      <div className="content-container flex flex-col gap-y-12">
        {/* --- 1. Trust & Service USPs (Replaces Newsletter) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800 pb-12">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#D4AF37]/20 text-[#D4AF37]">
              <IconTruckDelivery stroke={1.5} size={28} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white mb-1">
                Livrare Asigurată
              </h3>
              <p className="text-sm text-gray-400">
                Transport asigurat pentru orice comandă.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#D4AF37]/20 text-[#D4AF37]">
              <IconCertificate stroke={1.5} size={28} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white mb-1">
                Garanție Autenticitate
              </h3>
              <p className="text-sm text-gray-400">
                Fiecare bijuterie vine însoțită de certificat de calitate.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#D4AF37]/20 text-[#D4AF37]">
              <IconGift stroke={1.5} size={28} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white mb-1">
                Ambalaj de Lux
              </h3>
              <p className="text-sm text-gray-400">
                Experiență de unboxing premium, perfectă pentru cadouri.
              </p>
            </div>
          </div>
        </div>

        {/* --- 2. Main Navigation Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-x-16">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="uppercase font-serif text-xl tracking-wider hover:text-[#D4AF37] transition-colors"
            >
              Leone D&apos;Oro
            </LocalizedClientLink>
            <div className="flex flex-col gap-y-2 text-sm text-gray-400">
              <Image
                src="/images/logo.png"
                alt="Leone D'Oro Logo"
                width={120}
                height={40}
                className="object-contain"
              />
              {/* <LocalizedClientLink
                href="/about"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Despre Noi
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/povestea-noastra"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Povestea Noastră
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/certificari"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Certificări
              </LocalizedClientLink> */}
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div className="flex flex-col gap-y-4">
            <span className="text-base font-medium text-[#D4AF37]">
              Clienți
            </span>
            <div className="flex flex-col gap-y-2 text-sm text-gray-400">
              <LocalizedClientLink
                href="/contact"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Contact
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/livrare"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Livrare
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/returnari"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Returnări
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/garantie"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Garanție
              </LocalizedClientLink>
            </div>
          </div>

          {/* Column 3: Legal (Crucial for RO) */}
          <div className="flex flex-col gap-y-4">
            <span className="text-base font-medium text-[#D4AF37]">Legal</span>
            <div className="flex flex-col gap-y-2 text-sm text-gray-400">
              <LocalizedClientLink
                href="/termeni-si-conditii"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Termeni și Condiții
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/politica-de-confidentialitate"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Politica de Confidențialitate
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cookies"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Politica Cookies
              </LocalizedClientLink>
              <Link
                href="https://anpc.ro/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
              >
                ANPC
              </Link>
            </div>
          </div>

          {/* Column 4: Social & Info */}
          <div className="flex flex-col gap-y-4">
            <span className="text-base font-medium text-[#D4AF37]">
              Urmărește-ne
            </span>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                <IconBrandInstagram stroke={1.5} size={24} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                <IconBrandFacebook stroke={1.5} size={24} />
              </Link>
              <Link
                href="https://pinterest.com"
                target="_blank"
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                <IconBrandTiktok stroke={1.5} size={24} />
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Luni - Vineri: 09:00 - 18:00
            </p>
          </div>
        </div>

        {/* --- 3. Bottom Legal & Copyright --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-y-6">
          {/* Copyright */}
          <Text className="text-xs text-gray-500">
            © {new Date().getFullYear()} Leone D&apos;Oro. Toate drepturile
            rezervate.
          </Text>

          {/* ANPC Mandatory Banners */}
          <div className="flex gap-4">
            <Link
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noreferrer"
              className="relative h-6 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
            >
              <span className="text-[10px] border border-gray-600 px-2 py-1 text-gray-400 rounded">
                ANPC SAL
              </span>
            </Link>
            <Link
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="relative h-6 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
            >
              <span className="text-[10px] border border-gray-600 px-2 py-1 text-gray-400 rounded">
                ANPC SOL
              </span>
            </Link>
          </div>

          {/* Payment Icons */}
          <div className="flex gap-2 opacity-70">
            <div className="h-6 w-10 bg-gray-800 rounded-sm flex items-center justify-center text-[9px] text-gray-400 border border-gray-700">
              VISA
            </div>
            <div className="h-6 w-10 bg-gray-800 rounded-sm flex items-center justify-center text-[9px] text-gray-400 border border-gray-700">
              MC
            </div>
            <div className="h-6 w-10 bg-gray-800 rounded-sm flex items-center justify-center text-[9px] text-white font-bold border border-gray-700">
              Stripe
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
