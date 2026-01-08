import React from 'react'
import CategoryCard from './category-card'
import { listCategories } from '@lib/data/categories'

// Helper to map category handles to local images
// TODO: You can update these handles/images to match your actual content
const categoryImages: Record<string, string> = {
  "verighete": "/images/verighete.webp",
  "inele-de-logodna": "/images/inele-de-logodna.webp", 
  "bijuterii": "/images/bijuterii.webp",
}

const FeaturedCategories = async () => {
  const categories = await listCategories()
  
  // Filter only top level categories if needed, or just slice the first 4
  // Typically we want parent categories
  const parentCategories = categories?.filter(c => c.parent_category_id === null).slice(0, 4) || []

  if (!parentCategories.length) {
    return null
  }

  return (
    <div className='py-12 content-container'>
      <div className='flex flex-col gap-4 mb-8 text-center'>
        <h2 className='text-3xl font-serif text-gray-900'>Categorii</h2>
        <p className='text-ui-fg-subtle text-lg'>Descoperă colecțiile noastre</p>
      </div>

      <ul className='flex flex-wrap justify-center gap-6'>
        {parentCategories.map((category) => (
          <li key={category.id} className="w-full small:w-[calc(50%-1.5rem)] medium:w-[calc(33.33%-1.5rem)] max-w-[400px]">
            <CategoryCard 
                category={category} 
                image={categoryImages[category.handle] || "/images/golden-hero.webp"} 
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedCategories