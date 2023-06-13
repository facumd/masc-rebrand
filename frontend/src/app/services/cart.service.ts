import { Injectable } from '@angular/core';
import { ProductDetail } from '../models/productDetail.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: ProductDetail[] = [];

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(product: ProductDetail) {
    this.cartItems.push(product);
    this.saveCartItemsToLocalStorage();
  }

  private saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(product: ProductDetail) {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItemsToLocalStorage();
    }
  }

  getCartItems(): ProductDetail[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItemsToLocalStorage();
  }
}
