import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler } from "../store/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { productError } from "../components/Errors";
import Uploads from "../components/Uploads";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const [suppliers, setSuppliers] = useState([]);
  const { title, quantity, img, purchase_price, sell_price, supplier } = useSelector(
    (state) => state.product
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllSuppliers();
    dispatch(clearStateHandler());
  }, []);

  const getAllSuppliers = async () => {
    const res = await axios.get("/api/suppliers_list");
    const data = await res.data;
    if (res.status === 200) {
      setSuppliers(data);
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      const error = productError({
        title,
        quantity,
        purchase_price,
        sell_price,
        supplier,
        setMessage,
      });
      if (error) return;
      const res = await axios.post("/api/add-product", {
        title,
        img,
        quantity,
        purchase_price,
        sell_price,
        supplier,
      });
      if (res.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="products" pageName={path} href="/products" />
      <Form headingText="add product" submitHandler={addProductHandler}>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Title"
            name="title"
            value={title}
            changeInputHandler={changeInputHandler}
          />
          <Input
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            changeInputHandler={changeInputHandler}
          />
        </div>
        <Uploads />
        <div className="flex items-center gap-3">
          <Input
            placeholder="Purchase Price"
            name="purchase_price"
            value={purchase_price}
            changeInputHandler={changeInputHandler}
          />
          <Input
            placeholder="Sell Price"
            name="sell_price"
            value={sell_price}
            changeInputHandler={changeInputHandler}
          />
        </div>

        <Select
          name="supplier"
          value={supplier}
          changeInputHandler={changeInputHandler}
        >
          <option selected hidden>
            Supplier
          </option>
          {suppliers?.map((usr) => (
            <option key={usr.id} value={usr.id}>
              {usr.name}
            </option>
          ))}
        </Select>
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};

export default AddProduct;
