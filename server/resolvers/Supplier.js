const Supplier = {
  products: async (parent, args, { prisma }) => {
    const products = await prisma.product.findMany({
      where: { supplier_id: parseInt(parent.id) },
    });
    return products;
  },
};

module.exports = Supplier;
