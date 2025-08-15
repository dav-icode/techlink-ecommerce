// ================================================================
// HOME PAGE - Página inicial moderna (CORRIGIDA)
// ================================================================

import React from "react";
import {
  TrendingUp,
  Star,
  Zap,
  Shield,
  Truck,
  Award,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const HomePage: React.FC = () => {
  const { dispatch } = useApp(); // Removido 'state' não usado

  // Produtos em destaque (mock)
  const featuredProducts = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.8,
      badge: "Mais Vendido",
    },
    {
      id: "2",
      name: "MacBook Pro M3",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.9,
      badge: "Novo",
    },
    {
      id: "3",
      name: "AirPods Pro 2",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.7,
      badge: "Trending",
    },
  ];

  // Stats da loja
  const stats = [
    { label: "Produtos", value: "10K+", icon: Award, color: "text-blue-500" },
    { label: "Clientes", value: "50K+", icon: Star, color: "text-yellow-500" },
    {
      label: "Vendas",
      value: "1M+",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "Avaliação",
      value: "4.9★",
      icon: Shield,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-8 lg:p-12">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm">
              <Zap size={16} />
              <span>Ofertas relâmpago ativa!</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Tecnologia que
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                transforma
              </span>
              sua vida
            </h1>

            <p className="text-xl text-emerald-100 max-w-lg">
              Descubra os produtos mais inovadores com os melhores preços e
              entrega ultra-rápida.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  dispatch({ type: "SET_PAGE", payload: "products" })
                }
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span>Explorar Produtos</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                <PlayCircle size={20} />
                <span>Ver Demo</span>
              </button>
            </div>
          </div>

          {/* Imagem Hero */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Tech Store"
              className="rounded-3xl shadow-2xl w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, statIndex) => {
          // Renomeado index para statIndex
          const Icon = stat.icon;
          return (
            <div
              key={statIndex}
              className="group bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} className={stat.color} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Produtos em Destaque */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Produtos em Destaque
          </h2>
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: "products" })}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium group"
          >
            <span>Ver todos</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(
            (
              product // Removido index não usado
            ) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>

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
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-600">
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-all duration-200 hover:scale-105">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Benefícios */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">
          Por que escolher a TechLink?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 group">
            <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <Truck size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Entrega Rápida
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Receba seus produtos em até 24h em mais de 100 cidades
            </p>
          </div>

          <div className="text-center space-y-4 group">
            <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <Shield size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Compra Segura
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Seus dados protegidos com criptografia de ponta
            </p>
          </div>

          <div className="text-center space-y-4 group">
            <div className="w-16 h-16 bg-purple-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Garantia Total
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Garantia estendida e suporte 24/7 para todos produtos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
