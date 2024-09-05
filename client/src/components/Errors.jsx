import { fieldsError } from "../lib";

export const supplierError = ({ name, address, phone, setMessage }) => {
  const { nameError, addressError, phoneError } = fieldsError.supplier;

  if (name === "") {
    setMessage(nameError);
    return true;
  } else if (address === "") {
    setMessage(addressError);
    return true;
  } else if (phone === "") {
    setMessage(phoneError);
    return true;
  }
  return false;
};

export const productError = ({ title, quantity, purchase_price, sell_price, supplier, setMessage }) => {
    const { titleError, quantityError, purchasePriceError, sellPriceError, supplierError } = fieldsError.product;

    if(title === "") {
        setMessage(titleError);
        return true;
    }
    else if (quantity === "") {
        setMessage(quantityError);
        return true;
    }
    else if (purchase_price === "") {
        setMessage(purchasePriceError);
        return true;
    }
    else if (sell_price === "") {
        setMessage(sellPriceError);
        return true;
    }
    else if (supplier === "") {
        setMessage(supplierError);
        return true;
    }
    return false;
}

export const orderErrors = ({ quantity, product, setMessage }) => {
    const { quantityError, productError } = fieldsError.order;
    if(quantity === "") {
        setMessage(quantityError);
        return true;
    }
    else if (product === "") {
        setMessage(productError);
        return true;
    }

    return false;
};