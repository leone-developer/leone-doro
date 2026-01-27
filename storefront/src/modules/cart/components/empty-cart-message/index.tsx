import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 small:py-48 px-4 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <Heading
        level="h1"
        className="flex flex-row text-2xl small:text-3xl font-serif gap-x-2 items-baseline"
      >
        Coșul tău este gol
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem] text-ui-fg-subtle">
        Nu ai niciun produs în coș. Descoperă colecțiile noastre de bijuterii și găsește piesa perfectă pentru tine.
      </Text>
      <div>
        <InteractiveLink href="/store">Descoperă colecțiile</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
