import React from 'react'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useApp } from '../context/AppContext'

const CartPage: React.FC = () => {
  const { state, dispatch } = useApp()

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Carrinho ({state.cart.totalItems} itens)
      </h1>
      
      {state.cart.items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={64} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Adicione alguns produtos incríveis!
          </p>
          <button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-all duration-200 hover:scale-105"
          >
            Explorar Produtos
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.cart.items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                <div className="flex gap-4">
                  <img 
                    src={item.product.imageUrl || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop'} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-white">{item.product.name}</h3>
                    <p className="text-emerald-600 font-semibold">R$ {item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl">
                        <Minus size={16} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl">
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl ml-auto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 h-fit">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Resumo</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">R$ {state.cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Frete</span>
                <span className="font-semibold">Grátis</span>
              </div>
              <hr className="border-slate-200 dark:border-slate-700" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-emerald-600">R$ {state.cart.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all duration-200 hover:scale-105">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage