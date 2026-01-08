
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount: string;
  shipping: string;
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  model: string;
  selectedColor: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Review {
  id: number;
  author: string;
  date: string;
  title?: string;
  text: string;
  rating: number;
  avatar: string;
  productImage: string;
  productName?: string;
  productThumb?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}
