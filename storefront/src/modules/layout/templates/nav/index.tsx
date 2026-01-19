"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { IconUser, IconShoppingBag, IconMenu2, IconX } from "@tabler/icons-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

// Menu items in Romanian
const menuItems = [
  { name: "Toate Produsele", link: "/store" },
  { name: "Bijuterii", link: "/categories/bijuterii" },
  { name: "Inele de Logodnă", link: "/categories/inele-de-logodna" },
  { name: "Verighete", link: "/categories/verighete" },
  { name: "Contact", link: "/contact" },
]

const Nav = ({ cart }: { cart?: HttpTypes.StoreCart | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className="sticky top-0 z-50 transition-all duration-300"
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 1)",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        borderBottomColor: isScrolled ? "#D4AF37" : "#E5E7EB",
        boxShadow: isScrolled
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          : "none",
      }}
      style={{
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
    >
      <nav className="content-container flex items-center justify-between h-20">
        {/* Mobile Menu Button - Left */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="small:hidden text-gray-900 hover:text-[#D4AF37] transition-colors"
          aria-label="Meniu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? (
              <IconX className="h-6 w-6" stroke={1.5} />
            ) : (
              <IconMenu2 className="h-6 w-6" stroke={1.5} />
            )}
          </motion.div>
        </button>

        {/* Logo - Center on Mobile, Left on Desktop */}
        <LocalizedClientLink
          href="/"
          className="flex items-center small:flex-1"
          data-testid="nav-store-link"
        >
          <Image
            src="/images/logo.png"
            alt="Leone D'Oro"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
            unoptimized
          />
        </LocalizedClientLink>

        {/* Desktop Menu - Center */}
        <div className="hidden small:flex items-center gap-8 flex-1 justify-center">
          {menuItems.map((item) => (
            <LocalizedClientLink
              key={item.name}
              href={item.link}
              className="text-sm font-medium text-gray-900 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              {item.name}
            </LocalizedClientLink>
          ))}
        </div>

        {/* Utility Icons - Right */}
        <div className="flex items-center gap-4 small:gap-6 small:flex-1 justify-end">
          {/* Account - Desktop Only */}
          <LocalizedClientLink
            href="/account"
            className="hidden small:block text-gray-900 hover:text-[#D4AF37] transition-colors"
            data-testid="nav-account-link"
            aria-label="Contul Meu"
          >
            <IconUser className="h-5 w-5" stroke={1.5} />
          </LocalizedClientLink>

          {/* Cart - Always Visible */}
          <LocalizedClientLink
            href="/cart"
            className="text-gray-900 hover:text-[#D4AF37] transition-colors relative"
            data-testid="nav-cart-link"
            aria-label="Coș de cumpărături"
          >
            <IconShoppingBag className="h-5 w-5" stroke={1.5} />
            {(cart?.items?.length ?? 0) > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-medium text-white ring-2 ring-white">
                {cart?.items?.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </LocalizedClientLink>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="small:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="content-container py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <LocalizedClientLink
                  key={item.name}
                  href={item.link}
                  className="text-lg font-medium text-gray-900 hover:text-[#D4AF37] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </LocalizedClientLink>
              ))}

              {/* Mobile Utility Links */}
              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-4">
                <LocalizedClientLink
                  href="/account"
                  className="text-lg font-medium text-gray-900 hover:text-[#D4AF37] transition-colors flex items-center gap-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconUser className="h-5 w-5" stroke={1.5} />
                  Contul Meu
                </LocalizedClientLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Nav
