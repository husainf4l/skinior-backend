import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async handleCartOperation(data: {
        sessionsId: string;
        productId: number;
        variantId?: number;
        quantity: number;
        isAdd: boolean;
    }) {
        const shoppingCart = await this.getOrCreateCart(data.sessionsId);
        const product = await this.getProductWithPrice(data.productId);
        const price = product.discountedPrice ?? product.price;

        await this.upsertCartItem(
            shoppingCart.id,
            data.productId,
            data.variantId,
            data.quantity,
            price,
            data.isAdd,
        );

        return this.updateAndGetCartWithItems(shoppingCart.id);
    }

    async getOrCreateCart(sessionsId: string) {
        let cart = await this.prisma.shoppingCart.findUnique({
            where: { sessionsId },
            include: { items: { include: { product: { select: { image: true, name: true } } }, orderBy: { id: 'asc' } } },

        }

        );

        if (!cart) {
            cart = await this.prisma.shoppingCart.create({
                data: { sessionsId },
                include: { items: { include: { product: { select: { image: true, name: true } } } } },
            });
            console.log(`Created new cart with session ID: ${sessionsId}`);
        }

        return cart;
    }

    private async getProductWithPrice(productId: number) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    private async upsertCartItem(
        cartId: number,
        productId: number,
        variantId: number | null,
        quantity: number,
        price: number,
        isAdd: boolean,
    ) {
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { productId, shoppingCartId: cartId },
        });

        if (existingItem) {
            const newQuantity = isAdd ? existingItem.quantity + quantity : existingItem.quantity - quantity;

            if (newQuantity <= 0) {
                await this.deleteCartItem(existingItem.id);
            } else {
                await this.updateCartItem(existingItem.id, newQuantity, price);
            }
        } else if (isAdd) {
            await this.createCartItem(cartId, productId, variantId, quantity, price);
        } else {
            throw new NotFoundException('Product not found in cart');
        }
    }

    private async createCartItem(
        cartId: number,
        productId: number,
        variantId: number | null,
        quantity: number,
        price: number,
    ) {
        const total = quantity * price;

        await this.prisma.cartItem.create({
            data: {
                shoppingCartId: cartId,
                productId,
                variantId,
                quantity,
                price,
                total,
            },
        });

        console.log(`Added product ${productId} with quantity ${quantity} to cart.`);
    }

    private async updateCartItem(itemId: number, quantity: number, price: number) {
        const total = quantity * price;

        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity, price, total },
        });

        console.log(`Updated cart item ${itemId} with new quantity ${quantity}.`);
    }

    async deleteCartItem(itemId: number) {
        // Find the item to be deleted
        const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
        if (!item) throw new NotFoundException('Cart item not found');

        await this.prisma.cartItem.delete({ where: { id: itemId } });

        console.log(`Removed cart item ${itemId}.`);

        const cartId = item.shoppingCartId;
        return this.updateAndGetCartWithItems(cartId);
    }

    private async updateAndGetCartWithItems(cartId: number) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { id: cartId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) throw new NotFoundException('Cart not found');

        const total = cart.items.reduce((sum, item) => sum + item.total, 0);
        const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        const updatedCart = await this.prisma.shoppingCart.update({
            where: { id: cartId },
            data: { total, totalQuantity },
            include: { items: { include: { product: true } } },
        });

        console.log(`Updated cart ${cartId} with total: ${total} and quantity: ${totalQuantity}.`);
        return updatedCart;
    }

    async updateItemQuantity(itemId: number, quantity: number) {
        const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });

        if (!item) throw new NotFoundException('Cart item not found');

        // Calculate the new total for the updated item
        const newTotal = item.price * quantity;

        // Update the item with the new quantity and total
        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity, total: newTotal },
        });

        console.log(`Updated item ${itemId} quantity to ${quantity}.`);

        // Recalculate the cart's total and total quantity
        const cartId = item.shoppingCartId;
        return this.updateAndGetCartWithItems(cartId);
    }


    async getAllCarts() {
        return this.prisma.shoppingCart.findMany({
            include: { items: { include: { product: true } } },
        });
    }
}
