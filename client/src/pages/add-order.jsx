"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler } from "../store/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderErrors } from "../components/Errors";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER, ORDERS, PRODUCTS } from "../query";

const AddOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useQuery(PRODUCTS);
  const [products, setProducts] = useState([]);

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const { quantity, product } = useSelector((state) => state.order);
  const [message, setMessage] = useState("");
  const [createOrderMutation] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: ORDERS }],
  });

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
    // getAllProducts();
    dispatch(clearStateHandler());
  }, [data?.products]);

  // const getAllProducts = async () => {
  //   const res = await axios.get("/api/products_list");
  //   const data = await res.data;

  //   if (res.status === 200) {
  //     setProducts(data);
  //   }
  // };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const addOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const error = orderErrors({ quantity, product, setMessage });
      if (error) return;

      console.log(quantity, product);
      
      const { data } = await createOrderMutation({
        variables: {
          data: {
            product_id: product,
            quantity,
          },
        },
      });
      // console.log(data);
      navigate("/orders");
      // const res = await axios.post("/api/add-order", {
      //   quantity,
      //   product,
      // });
      // if (res.status === 200) {
      //
      //   // dispatch(clearStateHandler());
      // }
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
            <option key={prod?.id} value={prod?.id}>
              {prod?.title}
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
