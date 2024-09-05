const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addOrder = async (req, res) => {
  try {
    const { quantity, product } = req.body;
    await prisma.order.create({
      data: {
        quantity,
        product_id: parseInt(product),
      },
    });
    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        deletedAt: null
      },
      include: {
        product: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      res.json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, product } = req.body;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      res.json({ message: "Order not found" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        quantity,
        product_id: parseInt(product),
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      res.json({ error: "Order not found" });
    }

    // const deletedOrder = await prisma.order.delete({
    //   where: { id: parseInt(id) },
    // });
    const deletedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() }
    });
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.json({ error: error });
  }
};
