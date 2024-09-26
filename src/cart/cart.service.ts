// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private cartStorage = new Map<string, any[]>(); // Temporary storage for guest carts

  // Add item to cart
  async addToCart(userId: string | null, productId: number, quantity: number, variantId?: number) {
    const cartKey = userId || 'guest'; // Use 'guest' as the key if no userId

    if (!this.cartStorage.has(cartKey)) {
      this.cartStorage.set(cartKey, []);
    }

    const cart = this.cartStorage.get(cartKey);
    const existingItemIndex = cart.findIndex(item => item.productId === productId && item.variantId === variantId);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity, variantId });
    }

    return { message: 'Item added to cart', cart };
  }

  // Get cart details by userId or sessionId
  async getCart(userId: string | null, sessionId: string | null) {
    const cartKey = userId || sessionId || 'guest'; // Use sessionId or 'guest' if no userId
    return this.cartStorage.get(cartKey) || [];
  }

  // Remove item from cart by cartItemId
  async removeFromCart(cartItemId: number, userId: string | null, sessionId: string | null) {
    const cartKey = userId || sessionId || 'guest';
    const cart = this.cartStorage.get(cartKey) || [];

    const updatedCart = cart.filter(item => item.cartItemId !== cartItemId);
    this.cartStorage.set(cartKey, updatedCart);
    return { message: 'Item removed from cart', cart: updatedCart };
  }

  // Clear cart for a specific user or session
  async clearCart(userId: string | null, sessionId: string | null) {
    const cartKey = userId || sessionId || 'guest';
    this.cartStorage.set(cartKey, []); // Clear cart by key
    return { message: 'Cart cleared' };
  }
}
