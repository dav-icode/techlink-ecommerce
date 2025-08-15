// ================================================================
// PRODUCTS PAGE - Página de produtos (CORRIGIDA)
// ================================================================

import React, { useState } from "react";
import { Search, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"; // Removido Filter não usado
import { useApp } from "../context/AppContext";
import type { Product } from "../types"; // Importar tipo Product

const ProductsPage: React.FC = () => {
  const { dispatch } = useApp(); // Removido 'state' não usado
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock products
  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1299.99,
      originalPrice: 1499.99,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1234,
      category: "Smartphones",
      description: "O iPhone mais avançado já criado com chip A17 Pro",
      inStock: true,
      discount: 13,
      slug: "iphone-15-pro-max",
      stockQuantity: 50,
      categoryId: "smartphones",
      imageUrl:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // ... outros produtos com a mesma estrutura
  ];

  const categories = [
    "Todos",
    "Smartphones",
    "Laptops",
    "Audio",
    "Tablets",
    "Wearables",
    "Desktops",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Corrigir tipo do parâmetro product
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Produtos
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 shadow-lg"
                  : "hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Grid size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 shadow-lg"
                  : "hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <List size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Resto do componente igual... */}
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              viewMode === "list" ? "flex gap-6" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                  viewMode === "list" ? "w-full h-full" : "w-full h-64"
                }`}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    -{product.discount}%
                  </span>
                )}
                {!product.inStock && (
                  <span className="px-3 py-1 bg-slate-500 text-white text-xs font-bold rounded-full">
                    Esgotado
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110">
                  <Heart size={16} className="text-slate-600" />
                </button>
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    Indisponível
                  </span>
                </div>
              )}
            </div>

            <div
              className={`p-6 space-y-4 ${viewMode === "list" ? "flex-1" : ""}`}
            >
              <div className="space-y-2">
                <span className="text-sm text-emerald-600 font-medium">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-emerald-600">
                  R${" "}
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-slate-400 line-through">
                    R${" "}
                    {product.originalPrice.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <button
                onClick={() => addToCart(product as Product)}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-3 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  product.inStock
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-105"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={20} />
                <span>
                  {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
