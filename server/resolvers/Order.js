const Order = {
    product_id: async(parent, args, { prisma }) => {
        const product = await prisma.product.findUnique({ where: { id: parseInt(parent.product_id) } });
        return product;
    }
};

module.exports = Order;
