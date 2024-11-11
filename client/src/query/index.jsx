import { gql } from "@apollo/client";

// Suppliers

export const CREATE_SUPPLIER = gql`
  mutation createSupplier($data: CreateSupplierInput!) {
    createSupplier(data: $data) {
      id
      name
    }
  }
`;

export const SUPPLIERS = gql`
  query suppliers {
    suppliers {
      id
      name
      address
      phone
    }
  }
`;

export const SUPPLIER = gql`
  query supplier($id: String!) {
    supplier(id: $id) {
      name
      phone
      address
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($id: String!, $data: UpdateSupplierInput!) {
    updateSupplier(id: $id, data: $data) {
      id
      name
      address
      phone
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: String!) {
    deleteSupplier(id: $id) {
      id
      name
    }
  }
`;

// Products

export const CREATE_PRODUCT = gql`
  mutation createProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
      title
    }
  }
`;

export const PRODUCTS = gql`
  query products {
    products {
      id
      title
      img
      quantity
      purchase_price
      sell_price
      supplier_id {
        id
        name
      }
    }
  }
`;

export const PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      title
      img
      quantity
      purchase_price
      sell_price
      supplier_id {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
      title
      img
      quantity
      purchase_price
      sell_price
      supplier_id {
        id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
      title
    }
  }
`;

// Orders

export const CREATE_ORDER = gql`
  mutation createOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      id
      quantity
      price
      products {
        product_id {
          id
          title
        }
      }
    }
  }
`;

export const ORDERS = gql`
  query orders {
    orders {
      id
      price
      quantity
      createdAt
      updatedAt
    }
  }
`;

export const ORDER = gql`
  query order($id: String!) {
    order(id: $id) {
      id
      quantity
      price
      createdAt
      products {
        product_id {
          id
          title
          img
          quantity
          sell_price
        }
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: String!, $data: UpdateOrderInput!) {
    updateOrder(id: $id, data: $data) {
      id
      quantity
      price
      products {
        product_id {
          id
          title
          quantity
          img
          sell_price
        }
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id) {
      id
      quantity
      price
    }
  }
`;

//  Sales
export const DAILY_SALES = gql`
  query dailySales {
    dailySales {
      # totalOrders
      sales
    }
  }
`;

export const WEEKLY_SALES = gql`
  query weeklySales {
    weeklySales {
      date
      totalSales
    }
  }
`;
export const MONTHLY_SALES = gql`
  query monthlySales {
    monthlySales {
      date
      totalSales
    }
  }
`;
