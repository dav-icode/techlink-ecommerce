// ================================================================
// FILTER BAR COMPONENT - Barra de filtros para produtos
// ================================================================

import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { ProductFilters } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";

interface FilterBarProps {
  onFiltersChange: (filters: ProductFilters) => void;
  categories: any[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFiltersChange,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Função para aplicar filtros
  const applyFilters = () => {
    onFiltersChange(filters);
    setIsOpen(false);
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  // Função para atualizar filtro
  const updateFilter = (key: keyof ProductFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Botão para abrir filtros - Mobile */}
      <div className="lg:hidden mb-6">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          <Filter size={20} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Painel de filtros */}
      <Card
        className={`
          lg:sticky lg:top-20 transition-all duration-300
          ${
            isOpen
              ? "fixed top-0 left-0 right-0 bottom-0 z-50 lg:relative lg:z-auto m-4 lg:m-0 overflow-auto"
              : "hidden lg:block"
          }
        `}
      >
        {/* Header - Mobile */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Título - Desktop */}
        <h3 className="hidden lg:block text-lg font-semibold text-white mb-6">
          Filtros
        </h3>

        <div className="space-y-6">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Buscar
            </label>
            <Input
              placeholder="Nome do produto..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Categoria
            </label>
            <select
              value={filters.category || ""}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full bg-dark-800 border border-dark-600 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Faixa de preço */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Faixa de preço
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "minPrice",
                    parseFloat(e.target.value) || undefined
                  )
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "maxPrice",
                    parseFloat(e.target.value) || undefined
                  )
                }
              />
            </div>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Ordenar por
            </label>
            <select
              value={`${filters.sortBy || "name"}-${
                filters.sortOrder || "asc"
              }`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-");
                updateFilter("sortBy", sortBy);
                updateFilter("sortOrder", sortOrder);
              }}
              className="w-full bg-dark-800 border border-dark-600 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name-asc">Nome (A-Z)</option>
              <option value="name-desc">Nome (Z-A)</option>
              <option value="price-asc">Preço (Menor)</option>
              <option value="price-desc">Preço (Maior)</option>
              <option value="newest-desc">Mais recentes</option>
            </select>
          </div>

          {/* Botões de ação */}
          <div className="space-y-2">
            <Button className="w-full" onClick={applyFilters}>
              Aplicar Filtros
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={clearFilters}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FilterBar;
