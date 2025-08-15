/* eslint-disable react-refresh/only-export-components */
// ================================================================
// APP CONTEXT - Gerenciamento de estado global com tema
// ================================================================

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, Cart, PageType, Product } from "../types";

// Estado global da aplicação
interface AppState {
  // Usuário logado
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Navegação
  currentPage: PageType;

  // Carrinho
  cart: Cart;

  // Produtos
  products: Product[];
  categories: Category[];

  // UI States
  isSidebarOpen: boolean;
  isCartOpen: boolean;

  // Tema
  isDarkTheme: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// Actions disponíveis
type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PAGE"; payload: PageType }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | {
      type: "UPDATE_CART_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_CART" }
  | { type: "TOGGLE_THEME" };

// Estado inicial
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  currentPage: "home",
  cart: {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  },
  products: [],
  categories: [],
  isSidebarOpen: false,
  isCartOpen: false,
  isDarkTheme: true, // Começar com tema escuro
};

// Reducer para gerenciar as mudanças de estado
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
        isSidebarOpen: false, // Fecha sidebar ao navegar
      };
    }

    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }

    case "ADD_TO_CART": {
      const existingItem = state.cart.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.cart.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          cart: {
            ...state.cart,
            items: updatedItems,
            totalItems: state.cart.totalItems + 1,
            totalAmount: state.cart.totalAmount + action.payload.price,
          },
        };
      } else {
        const newItem = {
          id: Date.now().toString(),
          productId: action.payload.id,
          product: action.payload,
          quantity: 1,
          createdAt: new Date().toISOString(),
        };

        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, newItem],
            totalItems: state.cart.totalItems + 1,
            totalAmount: state.cart.totalAmount + action.payload.price,
          },
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.cart.items.find(
        (item) => item.product.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(
            (item) => item.product.id !== action.payload
          ),
          totalItems: state.cart.totalItems - itemToRemove.quantity,
          totalAmount:
            state.cart.totalAmount -
            itemToRemove.product.price * itemToRemove.quantity,
        },
      };
    }

    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    }

    case "TOGGLE_CART": {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }

    case "TOGGLE_THEME": {
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    }

    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Aplicar tema ao HTML
  useEffect(() => {
    const root = document.documentElement;
    if (state.isDarkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.isDarkTheme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro do AppProvider");
  }
  return context;
};

export default AppProvider;
