import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import { getBaseURL } from "@lib/util/env"
import Nav from "@/modules/layout/templates/nav"
import { retrieveCart } from "@lib/data/cart"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const cart = await retrieveCart()

  return (
    <>
      <Nav cart={cart} />
      {props.children}
      <Footer />
    </>
  )
}
