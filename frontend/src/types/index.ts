// ================================================================
// TYPES - Definições de tipos TypeScript para todo o projeto
// ================================================================

// User types - Tipos relacionados aos usuários
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

// Product types - Tipos relacionados aos produtos
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category types - Tipos das categorias
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

// Cart types - Tipos do carrinho de compras
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

// Order types - Tipos de pedidos
export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  createdAt: string;
}

// API Response types - Tipos de resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Navigation types - Tipos de navegação
export type PageType = "home" | "products" | "cart" | "profile" | "orders";

// Form types - Tipos de formulários
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Filter types - Tipos de filtros
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "name" | "price" | "newest";
  sortOrder?: "asc" | "desc";
}
