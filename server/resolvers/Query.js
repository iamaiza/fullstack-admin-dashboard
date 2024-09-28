const { getSalesByDate } = require("../utils");
const {
  startOfDay,
  endOfDay,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");

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
      include: {
        products: true,
      },
    });
    if (!order) {
      return { message: "Order not found." };
    }
    return order;
  },

  // Sales
  dailySales: async (_, args, { prisma }) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const sales = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: new Date(today),
            lte: new Date(
              new Date(today).setDate(new Date(today).getDate() + 1)
            ),
          },
        },
        select: {
          createdAt: true,
          price: true,
        },
      });

      const totalSalesAmount = sales.reduce(
        (acc, sale) => acc + parseInt(sale.price),
        0
      );
      // const totalOrders = sales.length;

      return {
        sales: totalSalesAmount,
        // totalSalesAmount,
      };
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  },
  weeklySales: async (_, __, { prisma }) => {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const sales = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
      },
      select: {
        createdAt: true,
        price: true,
      },
    });

    const groupedSales = {};

    sales.forEach((sale) => {
      const date = sale.createdAt.toISOString().split("T")[0];

      if (!groupedSales[date]) {
        groupedSales[date] = 0;
      }

      groupedSales[date] += parseInt(sale.price);
    });

    const result = [];
    for (const date in groupedSales) {
      result.push({
        date,
        totalSales: groupedSales[date],
      });
    }

    return result;
  },

  monthlySales: async (_, __, { prisma }) => {
    const startOfYearDate = startOfYear(new Date());
    const endOfYearDate = endOfYear(new Date());

    const sales = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfYearDate,
          lte: endOfYearDate,
        },
      },
      select: {
        createdAt: true,
        price: true,
      },
    });

    const groupedSalesByMonth = {};

    sales.forEach((sale) => {
      // get month and year of each order or sale
      const month = format(new Date(sale.createdAt), "yyyy-MM");
      if (!groupedSalesByMonth[month]) {
        // group sales and check if month exist if not set 0
        groupedSalesByMonth[month] = 0;
      }
      // if month exist sum the prices of each order|sale of that month
      groupedSalesByMonth[month] += parseFloat(sale.price);
    });

    const result = [];

    for (const month in groupedSalesByMonth) {
      if (groupedSalesByMonth.hasOwnProperty(month)) {
        result.push({
          date: month,
          totalSales: groupedSalesByMonth[month],
        });
      }
    }

    return result;
  },
};

module.exports = Query;
