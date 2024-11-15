const Mutation = {
  // Supplier
  createSupplier: async (_, args, { prisma }) => {
    try {
      const { name, address, phone } = args.data;
      const user = await prisma.supplier.findUnique({ where: { name } });
      if (user) {
        return { message: "User already exist." };
      }
      const usrPhone = await prisma.supplier.findUnique({ where: { phone } });
      if (usrPhone) {
        return { message: "Phone No. can't be same." };
      }

      const supplier = await prisma.supplier.create({
        data: { name, address, phone },
      });
      return supplier;
    } catch (error) {
      return { message: "Failed to create user." };
    }
  },
  updateSupplier: async (_, args, { prisma }) => {
    try {
      const { id, data } = args;
      const { name, address, phone } = data;
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id) },
      });
      if (!supplier) {
        res.json({ message: "Supplier not found" });
      }

      const updatedSupplier = await prisma.supplier.update({
        where: { id: parseInt(id) },
        data: {
          name,
          address,
          phone,
        },
      });
      return updatedSupplier;
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteSupplier: async (_, args, { prisma }) => {
    try {
      const { id } = args;
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id) },
      });
      if (!supplier) {
        return { message: "User not found." };
      }
      const deletedSupplier = await prisma.supplier.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() },
      });

      return deletedSupplier;
    } catch (error) {
      return { message: error.message };
    }
  },

  // Products
  createProduct: async (_, args, { prisma }) => {
    try {
      const { title, quantity, sell_price, purchase_price, supplier_id, img } =
        args.data;
      const product = await prisma.product.findUnique({ where: { title } });
      if (product) {
        return { message: "Product already exist with name." };
      }
      const newProduct = await prisma.product.create({
        data: {
          title,
          quantity,
          img,
          sell_price,
          purchase_price,
          supplier_id: parseInt(supplier_id),
        },
      });
      return newProduct;
    } catch (error) {
      return { message: error.message };
    }
  },
  updateProduct: async (_, args, { prisma }) => {
    try {
      const { id, data } = args;
      const { title, quantity, img, purchase_price, sell_price, supplier_id } =
        data;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        return { message: "Product not found." };
      }
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          title,
          quantity,
          img,
          purchase_price,
          sell_price,
          supplier_id: parseInt(supplier_id),
        },
      });
      return updatedProduct;
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteProduct: async (_, args, { prisma }) => {
    try {
      const { id } = args;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        return { message: "Product not found." };
      }
      const deletedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() },
      });
      return deletedProduct;
    } catch (error) {
      return { message: error.message };
    }
  },

  // Orders
  createOrder: async (_, args, { prisma }) => {
    try {
      const { price, quantity, products } = args.data;

      const order = await prisma.order.create({
        data: {
          price,
          quantity,
          products: {
            create: products.map((item) => ({
              product: {
                connect: { id: parseInt(item.product_id) },
              },
              quantity: item.quantity.toString(),
            })),
          },
        },
        include: {
          products: true,
        },
      });

      for (const item of products) {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(item.product_id) },
        });
        if (!product) throw new Error("Product not found");

        await prisma.product.update({
          where: { id: parseInt(item.product_id) },
          data: {
            quantity: (
              parseInt(product.quantity) - parseInt(item.quantity)
            ).toString(),
          },
        });
      }

      return order;
    } catch (error) {
      return { message: error.message };
    }
  },
  updateOrder: async (_, args, { prisma }) => {
    try {
      const { id, data } = args;
      const { products, quantity, price } = data;

      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          products: true,
        },
      });
      if (!order) {
        return { message: "Order not found" };
      }

      const updateOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: {
          quantity,
          price,
          price,
          products: {
            deleteMany: {},
            create: products.map((item) => ({
              product: {
                connect: { id: parseInt(item.product_id) },
              },
              quantity: item.quantity.toString(),
            })),
          },
        },
        include: {
          products: true,
        },
      });
      const existingProdMap = new Map();
      order.products.forEach((item) => {
        existingProdMap.set(item.product_id, parseInt(item.quantity));
      });

      await (async () => {
        for (const item of products) {
          const productId = parseInt(item.product_id);
          const newQuantity = parseInt(item.quantity);
      
          const product = await prisma.product.findUnique({
            where: { id: productId },
          });
      
          if (!product) {
            return { message: "Product not found" };
          }
      
          const existingQuantity = existingProdMap.get(productId) || 0;
          const quantityDifference = newQuantity - existingQuantity;
    
          const updatedQuantity = parseInt(product.quantity) - quantityDifference;
      
          await prisma.product.update({
            where: { id: productId },
            data: {
              quantity: updatedQuantity.toString(),
            },
          });
      
          existingProdMap.delete(productId);
        }
      
        for (const [productId, remainingQuantity] of existingProdMap) {
          const product = await prisma.product.findUnique({
            where: { id: productId },
          });
      
          if (product) {
          
            await prisma.product.update({
              where: { id: productId },
              data: {
                quantity: (parseInt(product.quantity) + remainingQuantity).toString(),
              },
            });
          }
        }
      })();

      return updateOrder;
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteOrder: async (_, args, { prisma }) => {
    try {
      const { id } = args;
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
      });
      if (!order) {
        return { message: "Order not found." };
      }
      const deletedOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() },
      });
      return deletedOrder;
    } catch (error) {
      return { message: error.message };
    }
  },
};

module.exports = Mutation;
