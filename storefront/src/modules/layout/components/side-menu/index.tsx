"use client"

import { Popover, Transition } from "@headlessui/react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  "Acasă": "/",
  "Bijuterii": "/collections",
  "Inele de Logodnă": "/categories/inele-logodna",
  "Verighete": "/categories/verighete",
  "Colecții Speciale": "/collections/speciale",
  "Despre Noi": "/despre-noi",
  "Contact": "/contact",
  "Caută": "/search",
  "Contul Meu": "/account",
  "Coș": "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  return (
    <div className="h-full">
      <Popover className="h-full flex">
        {({ open, close }) => (
          <>
            {/* Menu Button */}
            <Popover.Button
              data-testid="nav-menu-button"
              className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-[#D4AF37]"
              aria-label="Meniu"
            >
              <IconMenu2 className="h-6 w-6" stroke={1.5} />
            </Popover.Button>

            {/* Slide-out Panel */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <Popover.Panel className="fixed inset-0 z-50 flex">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                  onClick={close}
                  aria-hidden="true"
                />

                {/* Menu Content */}
                <div
                  data-testid="nav-menu-popup"
                  className="relative w-full max-w-sm bg-white shadow-xl flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Meniu</h2>
                    <button
                      data-testid="close-menu-button"
                      onClick={close}
                      className="p-2 hover:text-[#D4AF37] transition-colors"
                      aria-label="Închide meniul"
                    >
                      <IconX className="h-6 w-6" stroke={1.5} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 overflow-y-auto p-6">
                    <ul className="flex flex-col gap-4">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="block text-lg font-medium text-gray-900 hover:text-[#D4AF37] transition-colors py-2"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      © {new Date().getFullYear()} Leone D'Oro. Toate drepturile rezervate.
                    </p>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SideMenu
