import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetail } from 'src/app/models/productDetail.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: ProductDetail[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
  }

  removeFromCart(product: ProductDetail) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotalAmount();
  }

  private calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + Number(item.price),
      0
    );
  }
}
