// ================================================================
// HEADER COMPONENT - Cabeçalho principal da aplicação
// ================================================================

import React from "react";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Header: React.FC = () => {
  const { state, dispatch } = useApp();

  // Função para navegar entre páginas
  const navigateTo = (page: any) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  // Função para abrir/fechar carrinho
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  // Função para abrir/fechar sidebar mobile
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-950/95 backdrop-blur-sm border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-4">
            {/* Botão do menu mobile */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                TechLink
              </span>
            </div>
          </div>

          {/* Barra de busca - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Input
              placeholder="Buscar produtos..."
              leftIcon={<Search size={20} />}
              className="bg-dark-800/50"
            />
          </div>

          {/* Ações do usuário */}
          <div className="flex items-center gap-4">
            {/* Busca - Mobile */}
            <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>

            {/* Carrinho */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-slate-400 hover:text-white transition-colors group"
            >
              <ShoppingCart
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              {/* Badge do carrinho */}
              {state.cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                  {state.cart.totalItems}
                </span>
              )}
            </button>

            {/* Usuário */}
            {state.isAuthenticated ? (
              <button
                onClick={() => navigateTo("profile")}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <User size={20} />
              </button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateTo("profile")}
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
