// ================================================================
// APP COMPONENT - Aplicação completa com roteamento e animações
// ================================================================

import React, { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  User,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Zap,
} from "lucide-react";
import { AppProvider, useApp } from "./context/AppContext";
import type { PageType } from "./types"; // ← ADICIONADO

// Importar as páginas
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";

// Componente de transição entre páginas
const PageTransition: React.FC<{
  children: React.ReactNode;
  pageKey: string;
}> = ({ children, pageKey }) => {
  return (
    <div
      key={pageKey}
      className="animate-slideInUp"
      style={{
        animation: "slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {children}
    </div>
  );
};

// Componente principal da aplicação
const AppContent: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle do tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");

    // Animação de transição do tema
    document.body.style.transition = "background-color 0.3s ease";
  };

  // Navegação com loading
  const navigateTo = async (page: PageType) => {
    // ← CORRIGIDO
    if (page === state.currentPage) return;

    setIsLoading(true);
    setIsSidebarOpen(false);

    // Simular loading para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    dispatch({ type: "SET_PAGE", payload: page });
    setIsLoading(false);
  };

  // Items do menu principal com badges dinâmicos
  const menuItems = [
    {
      id: "home" as PageType, // ← CORRIGIDO
      label: "Home",
      icon: Home,
      active: state.currentPage === "home",
      description: "Página inicial",
    },
    {
      id: "products" as PageType, // ← CORRIGIDO
      label: "Produtos",
      icon: Package,
      active: state.currentPage === "products",
      description: "Catálogo completo",
    },
    {
      id: "cart" as PageType, // ← CORRIGIDO
      label: "Carrinho",
      icon: ShoppingCart,
      badge: state.cart.totalItems,
      active: state.currentPage === "cart",
      description: "Seus itens",
    },
    {
      id: "profile" as PageType, // ← CORRIGIDO
      label: "Perfil",
      icon: User,
      active: state.currentPage === "profile",
      description: "Sua conta",
    },
  ];

  // Renderizar página atual
  const renderCurrentPage = () => {
    const pageKey = state.currentPage;

    switch (state.currentPage) {
      case "home":
        return (
          <PageTransition pageKey={pageKey}>
            <HomePage />
          </PageTransition>
        );
      case "products":
        return (
          <PageTransition pageKey={pageKey}>
            <ProductsPage />
          </PageTransition>
        );
      case "cart":
        return (
          <PageTransition pageKey={pageKey}>
            <CartPage />
          </PageTransition>
        );
      case "profile":
        return (
          <PageTransition pageKey={pageKey}>
            <ProfilePage />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey={pageKey}>
            <HomePage />
          </PageTransition>
        );
    }
  };

  // Efeito de partículas no fundo
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "fixed pointer-events-none z-0 opacity-20";
      particle.style.width = Math.random() * 4 + 1 + "px";
      particle.style.height = particle.style.width;
      particle.style.background = isDarkTheme ? "#10b981" : "#059669";
      particle.style.borderRadius = "50%";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = "-10px";

      document.body.appendChild(particle);

      const animation = particle.animate(
        [
          { transform: "translateY(0px) rotate(0deg)", opacity: 0.2 },
          {
            transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 10000 + 10000,
          easing: "linear",
        }
      );

      animation.onfinish = () => particle.remove();
    };

    const intervalId = setInterval(createParticle, 2000);
    return () => clearInterval(intervalId);
  }, [isDarkTheme]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        isDarkTheme
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"
          : "bg-gradient-to-br from-slate-50 via-white to-emerald-50"
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-800 dark:text-white font-medium">
              Carregando...
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkTheme
            ? "bg-slate-900/80 border-slate-700/50"
            : "bg-white/80 border-slate-200/50"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`lg:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                isDarkTheme
                  ? "hover:bg-slate-800 text-slate-300"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkTheme
                      ? "text-white group-hover:text-emerald-400"
                      : "text-slate-800 group-hover:text-emerald-600"
                  }`}
                >
                  TechLink
                </h1>
                <div className="flex items-center gap-1">
                  <p
                    className={`text-xs ${isDarkTheme ? "text-emerald-400" : "text-emerald-600"}`}
                  >
                    Pro Commerce
                  </p>
                  <Zap size={12} className="text-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Busca Central */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  isDarkTheme
                    ? "text-slate-400 group-focus-within:text-emerald-400"
                    : "text-slate-500 group-focus-within:text-emerald-500"
                }`}
              />
              <input
                type="text"
                placeholder="Buscar produtos incríveis..."
                className={`w-full pl-12 pr-6 py-4 rounded-2xl border-0 transition-all duration-300 focus:scale-105 ${
                  isDarkTheme
                    ? "bg-slate-800/60 text-white placeholder-slate-400 focus:bg-slate-800/80"
                    : "bg-slate-100/80 text-slate-800 placeholder-slate-500 focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:shadow-2xl`}
              />
            </div>
          </div>

          {/* Ações do Header */}
          <div className="flex items-center gap-3">
            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                isDarkTheme
                  ? "bg-slate-800/80 hover:bg-slate-700 text-yellow-400 hover:text-yellow-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800"
              }`}
            >
              {isDarkTheme ? (
                <Sun
                  size={20}
                  className="animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* Notificações */}
            <button
              className={`relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                isDarkTheme
                  ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                3
              </span>
            </button>

            {/* Perfil */}
            <button
              onClick={() => navigateTo("profile")}
              className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <User size={20} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[73px] left-0 min-h-screen w-80 z-30 transition-all duration-500 ease-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } ${
            isDarkTheme
              ? "bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50"
              : "bg-white/95 backdrop-blur-xl border-r border-slate-200/50"
          }`}
        >
          {/* Estatísticas rápidas */}
          <div
            className={`p-6 border-b ${isDarkTheme ? "border-slate-700/30" : "border-slate-200/50"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-2xl ${isDarkTheme ? "bg-slate-800/60" : "bg-slate-50"}`}
              >
                <div
                  className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-slate-800"}`}
                >
                  {state.cart.totalItems}
                </div>
                <div
                  className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-600"}`}
                >
                  No Carrinho
                </div>
              </div>
              <div
                className={`p-4 rounded-2xl ${isDarkTheme ? "bg-slate-800/60" : "bg-slate-50"}`}
              >
                <div className="text-lg font-bold text-emerald-500">
                  {state.isAuthenticated ? "ON" : "OFF"}
                </div>
                <div
                  className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-600"}`}
                >
                  Status
                </div>
              </div>
            </div>
          </div>

          {/* Menu Principal */}
          <nav className="p-6 space-y-2 pb-24">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    item.active
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/25"
                      : isDarkTheme
                        ? "hover:bg-slate-800/80 text-slate-300 hover:text-white"
                        : "hover:bg-slate-100 text-slate-600 hover:text-slate-800"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInLeft 0.5s ease-out forwards",
                  }}
                >
                  <Icon
                    size={22}
                    className={`transition-all duration-300 group-hover:scale-110 ${
                      item.active ? "text-white" : ""
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div
                      className={`text-xs ${
                        item.active
                          ? "text-emerald-100"
                          : isDarkTheme
                            ? "text-slate-400"
                            : "text-slate-500"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full animate-pulse ${
                        item.active
                          ? "bg-white/20 text-white"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <ChevronRight
                    size={16}
                    className={`transition-all duration-300 group-hover:translate-x-1 ${
                      item.active ? "text-white" : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Seção de Configurações */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 border-t ${isDarkTheme ? "border-slate-700/30" : "border-slate-200/50"} ${isDarkTheme ? "bg-slate-900/95" : "bg-white/95"}`}
          >
            <button
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDarkTheme
                  ? "hover:bg-slate-800/80 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
            >
              <Settings
                size={22}
                className="transition-all duration-300 group-hover:rotate-180"
              />
              <div className="flex-1 text-left">
                <div className="font-semibold">Configurações</div>
                <div
                  className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}
                >
                  Preferências
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
          </div>
        </aside>

        {/* Overlay Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fadeIn"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6 lg:p-8 relative z-10">
          <div className="max-w-7xl mx-auto">{renderCurrentPage()}</div>
        </main>
      </div>
    </div>
  );
};

// Componente principal que provê o contexto
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />

      {/* Estilos de animação inline */}
      <style jsx global>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgb(16 185 129 / 0.3);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgb(16 185 129 / 0.6);
        }
      `}</style>
    </AppProvider>
  );
};

export default App;
