const Product = {
  supplier_id: async (parent, args, { prisma }) => {
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(parent.supplier_id) },
    });
    return supplier;
  },
  // orderId: async(parent, __, { prisma }) => {
  //   const order = await prisma.order.findUnique({
  //     where: { id: parseInt(parent.orderId) },
  //   })
  //   return order;
  // }
};

module.exports = Product;
