const Query = {
  // Suppliers

  suppliers: async (_, args, { prisma }) => {
    const suppliers = await prisma.supplier.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: "asc",
      },
    });
    return suppliers;
  },
  supplier: async (_, args, { prisma }) => {
    const { id } = args;
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
    });
    if (!supplier) {
      return { message: "User not found." };
    }
    return supplier;
  },

  // Products

  products: async (_, args, { prisma }) => {
    const products = await prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    });
    return products;
  },
  product: async (_, args, { prisma }) => {
    const { id } = args;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return { message: "Product not found." };
    }
    return product;
  },

  // Orders

  orders: async (_, args, { prisma }) => {
    const orders = await prisma.order.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    });

    return orders;
  },

  order: async (_, args, { prisma }) => {
    const { id } = args;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      return { message: "Order not found." };
    }
    return order;
  },
};

module.exports = Query;
