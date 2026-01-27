import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex flex-col small:flex-row small:items-center justify-between gap-4">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Ai deja un cont?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Autentifică-te pentru o experiență mai bună.
        </Text>
      </div>
      <div className="shrink-0">
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10 w-full small:w-auto" data-testid="sign-in-button">
            Autentificare
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
