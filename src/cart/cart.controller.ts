import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get('all')
    async getAllShoppingCarts() {
        return this.cartService.getAllCarts();
    }

    @Post('item')
    async addItem(
        @Body() data: { sessionsId: string; productId: number; variantId?: number; quantity: number; isAdd: boolean },
    ) {
        try {
            const updatedCart = await this.cartService.handleCartOperation(data);
            return {
                message: 'Cart updated successfully.',
                cart: updatedCart,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':sessionsId')
    async getCart(@Param('sessionsId') sessionsId: string) {
        try {
            return await this.cartService.getOrCreateCart(sessionsId);
        } catch (error) {
            throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
        }
    }

    @Put('item/:itemId')
    async updateItemQuantity(
        @Param('itemId') itemId: number,
        @Body() data: { quantity: number },
    ) {
        try {
            const updatedCart = await this.cartService.updateItemQuantity(+itemId, data.quantity);
            return {
                message: `Cart item ${itemId} updated successfully.`,
                cart: updatedCart,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete('item/:itemId')
    async deleteItem(@Param('itemId') itemId: number) {
        try {
            await this.cartService.deleteCartItem(+itemId);
            return {
                message: `Cart item with ID ${itemId} removed.`,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
