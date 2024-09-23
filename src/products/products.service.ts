import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    // Create a new product
    async create(createProductDto: CreateProductDto) {
        const { categories, variants, images, relatedProducts, reviews, ...productData } = createProductDto;

        return this.prisma.product.create({
            data: {
                ...productData,
                categories: {
                    connect: categories.map((categoryId) => ({ id: categoryId })),
                },
                variants: variants.length > 0
                    ? {
                        create: variants.map((variant) => ({
                            name: variant.name,
                            price: variant.price,
                            stock: variant.stock,
                            sku: variant.sku,
                            attributes: {
                                create: variant.attributes.map((attr) => ({
                                    key: attr.key,
                                    value: attr.value,
                                })),
                            },
                            images: {
                                create: variant.images.map((img) => ({
                                    url: img.url,
                                    altText: img.altText,
                                })),
                            },
                        })),
                    }
                    : undefined, // Only create variants if they exist
                images: {
                    create: images.map((img) => ({
                        url: img.url,
                        altText: img.altText,
                    })),
                },
                relatedProducts: relatedProducts.length > 0
                    ? {
                        connect: relatedProducts.map((relatedProductId) => ({
                            id: relatedProductId,
                        })),
                    }
                    : undefined, // Only connect related products if they exist
                reviews: reviews.length > 0
                    ? {
                        create: reviews.map((review) => ({
                            rating: review.rating,
                            comment: review.comment,
                        })),
                    }
                    : undefined, // Only create reviews if they exist
            },
            include: {
                images: true,
                categories: true,
                variants: {
                    include: {
                        attributes: true,
                        images: true,
                    },
                },
                reviews: true,
            },
        });
    }

    // Get all products
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                images: true,
                categories: true,
                variants: {
                    include: {
                        attributes: true,
                        images: true,
                    },
                },
                reviews: true,
                relatedProducts: true,
            },
        });
    }

    // Get product by ID
    async findOne(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                categories: true,
                variants: {
                    include: {
                        attributes: true,
                        images: true,
                    },
                },
                reviews: true,
                relatedProducts: true,
            },
        });
    }

    // Update a product
    async update(id: number, updateProductDto: UpdateProductDto) {
        const { categories, variants, images, relatedProducts, reviews, ...productData } = updateProductDto;

        return this.prisma.product.update({
            where: { id },
            data: {
                ...productData,
                categories: {
                    set: categories.map((categoryId) => ({ id: categoryId })),
                },
                variants: variants.length > 0
                    ? {
                        deleteMany: {}, // Delete all existing variants before creating new ones
                        create: variants.map((variant) => ({
                            name: variant.name,
                            price: variant.price,
                            stock: variant.stock,
                            sku: variant.sku,
                            attributes: {
                                create: variant.attributes.map((attr) => ({
                                    key: attr.key,
                                    value: attr.value,
                                })),
                            },
                            images: {
                                create: variant.images.map((img) => ({
                                    url: img.url,
                                    altText: img.altText,
                                })),
                            },
                        })),
                    }
                    : undefined, // Only create new variants if they exist
                images: images.length > 0
                    ? {
                        deleteMany: {}, // Delete existing images before adding new ones
                        create: images.map((img) => ({
                            url: img.url,
                            altText: img.altText,
                        })),
                    }
                    : undefined, // Only update images if they exist
                relatedProducts: relatedProducts.length > 0
                    ? {
                        set: relatedProducts.map((relatedProductId) => ({
                            id: relatedProductId,
                        })),
                    }
                    : undefined, // Only update related products if they exist
                reviews: reviews.length > 0
                    ? {
                        create: reviews.map((review) => ({
                            rating: review.rating,
                            comment: review.comment,
                        })),
                    }
                    : undefined, // Only update reviews if they exist
            },
            include: {
                images: true,
                categories: true,
                variants: {
                    include: {
                        attributes: true,
                        images: true,
                    },
                },
                reviews: true,
            },
        });
    }

    // Delete a product
    async remove(id: number) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}
