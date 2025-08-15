// ================================================================
// PRODUCT CARD COMPONENT - Card de produto individual
// ================================================================

import React from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Product } from "../../types";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  // Função para adicionar ao carrinho
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // Função para visualizar produto
  const viewProduct = () => {
    // TODO: Implementar visualização detalhada do produto
    console.log("Visualizando produto:", product);
  };

  return (
    <Card hover className="group overflow-hidden">
      {/* Imagem do produto */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={viewProduct}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Eye size={20} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        {/* Badge de estoque baixo */}
        {product.stockQuantity < 5 && product.stockQuantity > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Últimas unidades!
          </div>
        )}

        {/* Badge de esgotado */}
        {product.stockQuantity === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Esgotado
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="space-y-3">
        <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Preço */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-400">
            R$ {product.price.toFixed(2)}
          </span>

          {/* Estoque */}
          <span className="text-xs text-slate-500">
            {product.stockQuantity} em estoque
          </span>
        </div>

        {/* Botão de adicionar ao carrinho */}
        <Button
          className="w-full"
          disabled={product.stockQuantity === 0}
          onClick={addToCart}
        >
          <ShoppingCart size={20} className="mr-2" />
          {product.stockQuantity === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
