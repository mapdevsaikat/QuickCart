export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  digipin?: string;
  landmark?: string;
}
