import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[5/4] w-full bg-gray-100 bg-ui-bg-subtle" />
      <div className="flex flex-col mt-4 gap-y-2">
        <div className="w-3/5 h-5 bg-gray-100"></div>
        <div className="w-2/5 h-4 bg-gray-100"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
