"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductData,
  changeEventHandler,
  clearStateHandler,
} from "../store/productSlice";
import { productError } from "../components/Errors";
import Uploads from "../components/Uploads";
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCT, SUPPLIERS, UPDATE_PRODUCT } from "../query";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1).replace(/%20/g, " ");

  const searchParams = new URLSearchParams(location?.search);
  const prodId = searchParams.get("id");

  const [suppliers, setSuppliers] = useState([]);
  const { title, quantity, img, purchase_price, sell_price, supplier_id } =
    useSelector((state) => state.product);
  const [message, setMessage] = useState("");
  const { data, refetch } = useQuery(PRODUCT, {
    variables: { id: prodId },
  });
  const { data: userData } = useQuery(SUPPLIERS);
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (data?.product) {
      dispatch(
        setProductData({
          ...data.product,
          supplier_id: data.product.supplier_id.id,
        })
      );
    }
    if (userData?.suppliers) {
      setSuppliers(userData.suppliers);
    }
  }, [data?.product, userData?.suppliers]);

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const error = productError({
        title,
        quantity,
        purchase_price,
        sell_price,
        supplier_id,
        setMessage,
      });
      if (error) return;

      const { data } = await updateProductMutation({
        variables: {
          id: prodId,
          data: {
            title,
            img,
            quantity,
            purchase_price,
            sell_price,
            supplier_id,
          },
        },
      });

      console.log(data);
      dispatch(clearStateHandler());
      await refetch();
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="products" pageName={path} href="/products" />
      <Form
        headingText="Update product"
        update={true}
        submitHandler={updateProductHandler}
      >
        <div className="flex items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              title
            </label>
            <Input
              placeholder="Title"
              name="title"
              value={title}
              changeInputHandler={changeInputHandler}
            />
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              quantity
            </label>
            <Input
              placeholder="Quantity"
              name="quantity"
              value={quantity}
              changeInputHandler={changeInputHandler}
            />
          </div>
        </div>
        <Uploads />
        <div className="flex items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              purchase price
            </label>
            <Input
              placeholder="Purchase Price"
              name="purchase_price"
              value={purchase_price}
              changeInputHandler={changeInputHandler}
            />
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              sell price
            </label>
            <Input
              placeholder="Sell Price"
              name="sell_price"
              value={sell_price}
              changeInputHandler={changeInputHandler}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
            supplier
          </label>
          <Select
            name="supplier"
            value={supplier_id}
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
        </div>
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
      <div className="h-20" />
    </FormWrapper>
  );
};

export default UpdateProduct;
