// ================================================================
// CART COMPONENT - Carrinho lateral deslizante
// ================================================================

import React from 'react'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../ui/Button'
import Card from '../ui/Card'

const Cart: React.FC = () => {
  const { state, dispatch } = useApp()
  
  // Função para fechar carrinho
  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }
  
  // Função para remover item do carrinho
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }
  
  // Função para finalizar compra
  const handleCheckout = () => {
    // TODO: Implementar finalização da compra
    console.log('Finalizando compra...', state.cart)
    alert('Funcionalidade de checkout será implementada!')
  }
  
  return (
    <>
      {/* Overlay */}
      {state.isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        />
      )}
      
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-dark-900 border-l border-dark-800 z-50 transform transition-transform duration-300 ${
          state.isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <h2 className="text-xl font-bold text-white">
            Carrinho ({state.cart.totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-dark-800"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-auto p-6">
          {state.cart.items.length === 0 ? (
            /* Carrinho vazio */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-400 mb-4">Seu carrinho está vazio</p>
              <Button onClick={closeCart}>
                Continuar comprando
              </Button>
            </div>
          ) : (
            /* Items do carrinho */
            <div className="space-y-4">
              {state.cart.items.map((item) => (
                <Card key={item.id} padding="sm" className="flex items-center gap-4">
                  {/* Imagem do produto */}
                  <img
                    src={item.product.imageUrl || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-dark-800"
                  />
                  
                  {/* Detalhes do produto */}
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{item.product.name}</h3>
                    <p className="text-primary-400 font-semibold">
                      R$ {item.product.price.toFixed(2)}
                    </p>
                    
                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="p-1 bg-dark-800 hover:bg-dark-700 rounded transition-colors"
                        onClick={() => {
                          if (item.quantity > 1) {
                            // TODO: Implementar redução de quantidade
                          } else {
                            removeFromCart(item.product.id)
                          }
                        }}
                      >
                        {item.quantity > 1 ? <Minus size={12} /> : <Trash2 size={12} />}
                      </button>
                      
                      <span className="text-white px-2">{item.quantity}</span>
                      
                      <button
                        className="p-1 bg-dark-800 hover:bg-dark-700 rounded transition-colors"
                        onClick={() => {
                          // TODO: Implementar aumento de quantidade
                          dispatch({ type: 'ADD_TO_CART', payload: item.product })
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Botão remover */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer - Total e Checkout */}
        {state.cart.items.length > 0 && (
          <div className="border-t border-dark-800 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-slate-300">Total:</span>
              <span className="text-primary-400">
                R$ {state.cart.totalAmount.toFixed(2)}
              </span>
            </div>
            
            {/* Botões */}
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={closeCart}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart