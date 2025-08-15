// ================================================================
// API SERVICE - Serviço para comunicação com backend
// ================================================================

import { Product, User, Cart, Order, ApiResponse } from "../types";

// Base URL da API - ajustar conforme necessário
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Classe para gerenciar requisições HTTP
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autenticação se existir
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na requisição");
      }

      return data;
    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }
  }

  // ================================================================
  // PRODUTOS
  // ================================================================

  // Buscar todos os produtos
  async getProducts(filters?: any): Promise<ApiResponse<Product[]>> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters).toString()}`
      : "";
    return this.request<Product[]>(`/products${queryParams}`);
  }

  // Buscar produto por ID
  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  // Buscar produtos por categoria
  async getProductsByCategory(
    categoryId: string
  ): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(`/products/category/${categoryId}`);
  }

  // ================================================================
  // AUTENTICAÇÃO
  // ================================================================

  // Login do usuário
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Registro do usuário
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // Logout do usuário
  async logout(): Promise<ApiResponse<void>> {
    return this.request<void>("/auth/logout", {
      method: "POST",
    });
  }

  // Buscar perfil do usuário
  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/profile");
  }

  // ================================================================
  // CARRINHO
  // ================================================================

  // Buscar carrinho do usuário
  async getCart(): Promise<ApiResponse<Cart>> {
    return this.request<Cart>("/cart");
  }

  // Adicionar item ao carrinho
  async addToCart(
    productId: string,
    quantity: number = 1
  ): Promise<ApiResponse<Cart>> {
    return this.request<Cart>("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  // Atualizar quantidade no carrinho
  async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<ApiResponse<Cart>> {
    return this.request<Cart>("/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  // Remover item do carrinho
  async removeFromCart(productId: string): Promise<ApiResponse<Cart>> {
    return this.request<Cart>(`/cart/remove/${productId}`, {
      method: "DELETE",
    });
  }

  // ================================================================
  // PEDIDOS
  // ================================================================

  // Buscar pedidos do usuário
  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<Order[]>("/orders");
  }

  // Criar novo pedido
  async createOrder(orderData: {
    shippingAddress: string;
  }): Promise<ApiResponse<Order>> {
    return this.request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  // Buscar detalhes de um pedido
  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/${orderId}`);
  }

  // ================================================================
  // CATEGORIAS
  // ================================================================

  // Buscar todas as categorias
  async getCategories(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>("/categories");
  }
}

// Instância da API service
export const apiService = new ApiService(API_BASE_URL);

// TODO: Implementar uso dos serviços nos componentes
// Exemplo de uso:
/*
// No componente:
import { apiService } from '../services/api'

const loadProducts = async () => {
  try {
    const response = await apiService.getProducts()
    if (response.success) {
      setProducts(response.data)
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}
*/
