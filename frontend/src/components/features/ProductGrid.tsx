// ================================================================
// PRODUCT GRID COMPONENT - Grid responsivo de produtos
// ================================================================

import React from 'react'
import { Product } from '../../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading = false }) => {
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-dark-800 rounded-xl p-6">
              <div className="bg-dark-700 h-48 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="bg-dark-700 h-4 rounded w-3/4"></div>
                <div className="bg-dark-700 h-3 rounded w-full"></div>
                <div className="bg-dark-700 h-3 rounded w-2/3"></div>
                <div className="bg-dark-700 h-8 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Nenhum produto encontrado
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <p className="text-slate-400 text-lg mb-2">Nenhum produto encontrado</p>
        <p className="text-slate-500">Tente ajustar os filtros de busca</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid