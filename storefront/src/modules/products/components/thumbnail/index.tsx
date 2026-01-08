import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  // Get the second image for hover effect if available
  const secondaryImage = images?.[1]?.url

  return (
    <div
      className={clx(
        "relative w-full overflow-hidden group",
        className,
        {
          "aspect-[5/4]": !size || size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder 
        image={initialImage} 
        secondaryImage={secondaryImage}
        size={size} 
      />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  secondaryImage,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string; secondaryImage?: string }) => {
  return image ? (
    <>
      {/* Primary Image */}
      <Image
        src={image}
        alt="Thumbnail"
        className={clx(
          "absolute inset-0 object-cover object-center transition-opacity duration-500 ease-in-out",
          secondaryImage ? "group-hover:opacity-0" : "" // Hide primary on hover if secondary exists
        )}
        draggable={false}
        quality={80} // Increased for better jewelry detail
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        fill
      />
      
      {/* Secondary (Hover) Image */}
      {secondaryImage && (
        <Image
          src={secondaryImage}
          alt="Thumbnail Hover"
          className="absolute inset-0 object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          draggable={false}
          quality={80}
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          fill
        />
      )}
    </>
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail