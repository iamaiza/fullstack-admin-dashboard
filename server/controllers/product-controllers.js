const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addProduct = async (req, res) => {
  try {
    const { title, quantity, sell_price, purchase_price, supplier, img } = req.body;
    await prisma.product.create({
      data: {
        title,
        quantity,
        img,
        sell_price,
        purchase_price,
        supplier_id: parseInt(supplier),
      },
    });
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        supplier: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      res.json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quantity, purchase_price, sell_price, supplier, img } = req.body;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      res.json({ message: "Product not found" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title,
        quantity,
        img,
        purchase_price,
        sell_price,
        supplier_id: parseInt(supplier),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      res.json({ error: "Product not found" });
    }

    const orders = await prisma.order.findMany({
      where: { product_id: parseInt(id) },
    });

    if (orders.length > 0) {
      res.json({
        message: "This product has orders placed and can't be deleted.",
      });
    } else {
      const deletedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json(deletedProduct);
    }
    // const deletedProduct = await prisma.product.delete({ where: { id: parseInt(id) } });
    // const order = await prisma.order.delete({ where: { product_id: parseInt(id) } });
  } catch (error) {
    res.json({ error: error });
  }
};
