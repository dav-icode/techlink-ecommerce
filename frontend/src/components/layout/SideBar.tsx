// ================================================================
// SIDEBAR COMPONENT - Menu lateral para navegação
// ================================================================

import React from 'react'
import { Home, Package, ShoppingCart, User, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { PageType } from '../../types'

const Sidebar: React.FC = () => {
  const { state, dispatch } = useApp()
  
  // Lista de itens do menu
  const menuItems = [
    { id: 'home' as PageType, label: 'Início', icon: Home },
    { id: 'products' as PageType, label: 'Produtos', icon: Package },
    { id: 'cart' as PageType, label: 'Carrinho', icon: ShoppingCart },
    { id: 'profile' as PageType, label: 'Perfil', icon: User },
  ]
  
  // Função para navegar
  const navigateTo = (page: PageType) => {
    dispatch({ type: 'SET_PAGE', payload: page })
  }
  
  // Função para fechar sidebar
  const closeSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }
  
  return (
    <>
      {/* Overlay */}
      {state.isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-dark-900 border-r border-dark-800 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          state.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`}
      >
        {/* Header do sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-dark-800 lg:hidden">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button
            onClick={closeSidebar}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Menu items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = state.currentPage === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-dark-800'
                    }`}
                  >
                    <Icon 
                      size={20} 
                      className={`transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-400'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Badge para carrinho */}
                    {item.id === 'cart' && state.cart.totalItems > 0 && (
                      <span className="ml-auto bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {state.cart.totalItems}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar