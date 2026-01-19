import { ModuleProviderExports } from '@medusajs/framework/types'
import R2FileProviderService from './service'

const services = [R2FileProviderService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
