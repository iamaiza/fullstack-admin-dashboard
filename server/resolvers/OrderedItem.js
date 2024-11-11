const OrderedItem = {
  product_id: async (parent, __, { prisma }) => {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(parent.product_id) },
    });

    if (!product) {
      return { message: "No product found." };
    }
    return {
      ...product,
      quantity: parent?.quantity,
    };
  },
  order_id: async (parent, __, { prisma }) => {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(parent.order_id) },
    });
    
    // if (!order) {
    //   return { message: "No order found." };
    // }
    
    return order;
  },
};

module.exports = OrderedItem;
