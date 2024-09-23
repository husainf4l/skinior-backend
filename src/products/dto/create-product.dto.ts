export class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku?: string;
    slug: string;
    brand?: string;
    isFeatured?: boolean;
    isTopLine?: boolean;
    categories: number[]; // IDs of categories
    images: { url: string; altText?: string }[];
    variants: { // Non-optional variants
        name: string;
        price: number;
        stock: number;
        sku?: string;
        attributes: { key: string; value: string }[];
        images: { url: string; altText?: string }[];
    }[] = []; // Default to an empty array if not provided
    relatedProducts: number[] = []; // Default to an empty array if not provided
    reviews: { // Non-optional reviews
        rating: number;
        comment: string;
    }[] = []; // Default to an empty array if not provided
}
