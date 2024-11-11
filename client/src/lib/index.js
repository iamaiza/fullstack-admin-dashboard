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
    relatedPaths: ["/products", "/add-product", "/update-product"],
  },
  {
    title: "suppliers",
    src: "/suppliers",
    icon: "assets/supplier-icon.svg",
    relatedPaths: ["/suppliers", "/add-supplier", "/update-supplier"],
  },
  {
    title: "orders",
    src: "/orders",
    icon: "assets/order-icon.svg",
    relatedPaths: ["/orders", "/add-order", "/update-order"],
  },
];

export const productDeletionSuccess = "Product deleted successfully";
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