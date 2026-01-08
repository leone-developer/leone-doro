import React from 'react'
import Image from 'next/image'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { HttpTypes } from '@medusajs/types'

type CategoryCardProps = {
  category: HttpTypes.StoreProductCategory
  image: string
}

const CategoryCard = ({ category, image }: CategoryCardProps) => {
  return (
    <div className='relative aspect-[4/5] w-full overflow-hidden rounded-lg group'>
      <LocalizedClientLink href={`/categories/${category.handle}`} className="block h-full w-full">
        <Image
          src={image}
          alt={category.name}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-105'
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <ProgressiveBlur
          className='pointer-events-none absolute bottom-0 left-0 h-[60%] w-full'
          blurIntensity={6}
        />
        <div className='absolute bottom-0 left-0 w-full p-6'>
          <div className='flex flex-col items-start gap-2'>
            <h3 className='text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300'>
              {category.name}
            </h3>
            {category.description && (
                <p className='text-sm text-zinc-300 line-clamp-2'>
                  {category.description}
                </p>
            )}
            <span className='text-sm font-medium text-white/90 mt-2 underline decoration-transparent group-hover:decoration-[#D4AF37] transition-all underline-offset-4'>
                Vezi Produse
            </span>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}

export default CategoryCard