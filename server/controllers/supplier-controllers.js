const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await prisma.supplier.create({
      data: { name, address, phone },
    });
    res.status(200).json({ message: "Supplier added successfully." });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(suppliers);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.getSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
    });
    if (!supplier) {
      res.json({ error: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;
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

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
    });
    if (!supplier) {
      res.json({ error: "Supplier not found" });
    }

    // const deletedSupplier = await prisma.supplier.delete({
    //   where: { id: parseInt(id) },
    // });
    const deletedSupplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() }
    });
    res.status(200).json(deletedSupplier);
  } catch (error) {
    res.json({ error: error });
  }
};
