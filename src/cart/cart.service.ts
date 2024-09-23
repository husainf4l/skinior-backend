import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async addToCart(userId: string | null, productId: number, quantity: number, variantId?: number) {
        // Handle cart logic with optional user
        // `userId` can be null if the user is not logged in
        return this.prisma.cartItem.create({
            data: {
                productId,
                quantity,
                variantId,
                cart: {
                    connectOrCreate: {
                        where: { userId },
                        create: { userId },
                    },
                },
            },
        });
    }

    async getCart(userId: string | null): Promise<Cart | null> {
        return this.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true, variant: true } } },
        });
    }
}
