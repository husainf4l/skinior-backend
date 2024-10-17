import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderCartService {
  private cartStorage = new Map<string, any[]>(); // Temporary storage for guest carts

  constructor(private readonly prisma: PrismaService) {}

  // -------------- CART FUNCTIONS -------------- //

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

// Remove item from cart by productId (or variantId if applicable)
async removeFromCart(productId: number, userId: string | null, sessionId: string | null, variantId?: number) {
    const cartKey = userId || sessionId || 'guest';
    const cart = this.cartStorage.get(cartKey) || [];
  
    const updatedCart = cart.filter(item => !(item.productId === productId && item.variantId === variantId));
    this.cartStorage.set(cartKey, updatedCart);
    return { message: 'Item removed from cart', cart: updatedCart };
  }
  

  // Clear cart for a specific user or session
  async clearCart(userId: string | null, sessionId: string | null) {
    const cartKey = userId || sessionId || 'guest';
    this.cartStorage.set(cartKey, []); // Clear cart by key
    return { message: 'Cart cleared' };
  }

  // -------------- ORDER FUNCTIONS -------------- //

  // Place a new order from the cart
  async placeOrder(userId: string | null, orderData: Prisma.OrderCreateInput): Promise<Order> {
    const cartKey = userId || 'guest';
    const cartItems = this.cartStorage.get(cartKey);
  
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cannot place order: cart is empty.');
    }
  
    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        shippingCity: orderData.shippingCity, 
        orderItems: {
          create: cartItems.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            variant: item.variantId ? { connect: { id: item.variantId } } : undefined,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  
    // Clear the cart after placing the order
    await this.clearCart(userId, null);
  
    return order;
  }
  

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: { include: { product: true, variant: true } }, // Include necessary relations
        user: true,
      },
    });
  }

  // Get orders by User ID
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: { include: { product: true, variant: true } },
      },
    });
  }
}
