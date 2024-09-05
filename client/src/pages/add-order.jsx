"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler } from "../store/orderSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderErrors } from "../components/Errors";

const AddOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const { quantity, product } = useSelector((state) => state.order);
  const [message, setMessage] = useState("")

  useEffect(() => {
    getAllProducts();
    dispatch(clearStateHandler())
  }, []);

  const getAllProducts = async () => {
    const res = await axios.get("/api/products_list");
    const data = await res.data;

    if (res.status === 200) {
      setProducts(data);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const addOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const error = orderErrors({ quantity, product, setMessage });
      if (error) return;

      const res = await axios.post("/api/add-order", {
        quantity,
        product,
      });
      if (res.status === 200) {
        navigate("/orders");
        // dispatch(clearStateHandler());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="orders" pageName={path} href="/orders" />
      <Form headingText="add order" submitHandler={addOrderHandler}>
        <Select
          name="product"
          value={product}
          changeInputHandler={changeInputHandler}
        >
          <option selected hidden>
            Product
          </option>
          {products?.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.title}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Quantity"
          name="quantity"
          value={quantity}
          changeInputHandler={changeInputHandler}
        />
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};

export default AddOrder;
