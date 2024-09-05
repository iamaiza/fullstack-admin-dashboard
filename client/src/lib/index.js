export const sidebarLinks = [
  {
    title: "dashboard",
    src: "/",
    icon: "assets/sidebar-dashboard-icon.svg",
  },
  {
    title: "products",
    src: "/products",
    icon: "assets/product-icon.svg",
  },
  {
    title: "suppliers",
    src: "/suppliers",
    icon: "assets/supplier-icon.svg",
  },
  {
    title: "orders",
    src: "/orders",
    icon: "assets/order-icon.svg",
  },
];

export const routeCategories = {
  products: ["/products", "/add-product", "/update-product"],
  suppliers: ["/suppliers", "/add-supplier", "/update-supplier"],
  orders: ["/orders", "/add-order", "/update-order"],
};

export const productDeletionSuccess = "Product deleted successfully";
// export const fieldsError = {
//   product: [
//     { id: "title", text: "Title is required." },
//     { text: "Quantity is required." },
//     { text: "Purchase price is required." },
//     { text: "Sell price is required." },
//     { text: "Supplier is required." }
//   ],
//   supplier: [
//     { text: "Name is required." },
//     { text: "Address is required." },
//     { text: "Phone No. is required." }
//   ]
// };
export const fieldsError = {
    product: {
        titleError: "Title is required.",
        quantityError: "Quantity is required.",
        purchasePriceError: "Purchase price is required.",
        sellPriceError: "Sell price is required.",
        supplierError: "Supplier is required",
    },
    supplier: {
        nameError: "Name is required.",
        addressError: "Address is required.",
        phoneError: "Phone number is required.",
    },
    order: {
        quantityError: "Quantity is required.",
        productError: "Product is required.",
    }
  };