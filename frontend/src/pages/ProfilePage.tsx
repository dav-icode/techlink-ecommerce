import React from "react";
import { User, Settings, Package, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";

const ProfilePage: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Meu Perfil
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {state.user?.name || "Usuário"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {state.user?.email || "usuario@techlink.com"}
          </p>
          <button className="mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-all duration-200">
            Editar Perfil
          </button>
        </div>

        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <Package size={32} className="text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Meus Pedidos
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Acompanhe seus pedidos
            </p>
            <button className="text-emerald-600 font-medium">
              Ver todos →
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <Heart size={32} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Favoritos
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Produtos salvos
            </p>
            <button className="text-emerald-600 font-medium">
              Ver lista →
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 md:col-span-2">
            <Settings size={32} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Configurações
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Gerencie sua conta e preferências
            </p>
            <button className="text-emerald-600 font-medium">
              Configurar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
