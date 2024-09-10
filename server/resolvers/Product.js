const Product = {
  supplier_id: async (parent, args, { prisma }) => {
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(parent.supplier_id) },
    });
    return supplier;
  },
  orders: async (parent, args, { prisma }) => {
    const orders = await prisma.order.findMany({
      where: { product_id: parseInt(parent.id) },
    });
    return orders;
  },
};

module.exports = Product;
