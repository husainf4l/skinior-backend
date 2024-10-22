import { PrismaClient, Role, OrderStatusenm } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data (optional: to prevent duplicate constraints)
  await prisma.cartItem.deleteMany();
  await prisma.shoppingCart.deleteMany();
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shippingMethod.deleteMany();

  console.log('Existing data cleared.');

  // Create Shipping Methods
  const shippingMethod = await prisma.shippingMethod.create({
    data: {
      name: 'Standard Shipping',
      price: 5.99,
    },
  });

  // Create Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Clothing',handle:"sas" },
      { name: 'Electronics',handle:"45" },
      { name: 'Home Appliances' ,handle:"5sad"},
    ],
  });

  const [clothingCategory, electronicsCategory, appliancesCategory] = await prisma.category.findMany();

  // Create Products with Items
  const products = await prisma.product.createMany({
    data: [
      { name: 'T-Shirt', descriptionAr: 'قميص', descriptionEn: 'Comfortable cotton t-shirt', image: 'tshirt.jpg', categoryId: clothingCategory.id },
      { name: 'Laptop', descriptionAr: 'كمبيوتر محمول', descriptionEn: 'Gaming laptop', image: 'laptop.jpg', categoryId: electronicsCategory.id },
      { name: 'Washing Machine', descriptionAr: 'غسالة', descriptionEn: 'Automatic washing machine', image: 'washing_machine.jpg', categoryId: appliancesCategory.id },
    ],
  });

  const [tshirt, laptop, washingMachine] = await prisma.product.findMany();

  // Create Product Items (Variants)
  const productItems = await prisma.productItem.createMany({
    data: [
      { productId: tshirt.id, sku: 'TSHIRT-RED-M', stock: 50, price: 19.99, discountedPrice: 17.99, image: 'tshirt-red.jpg' },
      { productId: tshirt.id, sku: 'TSHIRT-BLUE-L', stock: 30, price: 21.99, discountedPrice: 19.99, image: 'tshirt-blue.jpg' },
      { productId: laptop.id, sku: 'LAPTOP-GAMING-123', stock: 10, price: 999.99, discountedPrice: 899.99, image: 'laptop.jpg' },
      { productId: washingMachine.id, sku: 'WASH-MACHINE-456', stock: 20, price: 499.99, discountedPrice: 459.99, image: 'washing_machine.jpg' },
    ],
  });

  const [redTshirt, blueTshirt, gamingLaptop, washingMachineItem] = await prisma.productItem.findMany();

  // Create Users
  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: Role.ADMIN },
      { email: 'john@example.com', password: 'john123', firstName: 'John', lastName: 'Doe', role: Role.CUSTOMER },
    ],
  });

  const users = await prisma.user.findMany();

  // Create Carts and Cart Items
  await prisma.shoppingCart.createMany({
    data: users.map(user => ({
      userId: user.id,
    })),
  });

  const carts = await prisma.shoppingCart.findMany();

  await prisma.cartItem.createMany({
    data: [
      { cartId: carts[0].id, itemId: redTshirt.id, quantity: 2 },
      { cartId: carts[0].id, itemId: gamingLaptop.id, quantity: 1 },
      { cartId: carts[1].id, itemId: blueTshirt.id, quantity: 1 },
      { cartId: carts[1].id, itemId: washingMachineItem.id, quantity: 1 },
    ],
  });

  // Create Orders with Multiple Products
  await prisma.order.create({
    data: {
      userId: users[1].id,
      date: new Date(),
      shippingMethodId: shippingMethod.id,
      status: OrderStatusenm.PENDING,
      total: 54.97,
      lines: {
        create: [
          { itemId: redTshirt.id, quantity: 2, price: 17.99 },
          { itemId: blueTshirt.id, quantity: 1, price: 19.99 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      date: new Date(),
      shippingMethodId: shippingMethod.id,
      status: OrderStatusenm.SHIPPED,
      total: 1359.98,
      lines: {
        create: [
          { itemId: gamingLaptop.id, quantity: 1, price: 899.99 },
          { itemId: washingMachineItem.id, quantity: 1, price: 459.99 },
        ],
      },
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
