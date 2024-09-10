import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEventHandler,
  clearStateHandler,
  setOrderData,
} from "../store/orderSlice";
import { useMutation, useQuery } from "@apollo/client";
import { ORDER, PRODUCTS, UPDATE_ORDER } from "../query";

const UpdateOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const search = new URLSearchParams(location.search);
  const order_id = search.get("id");
  const { data } = useQuery(PRODUCTS);
  const [products, setProducts] = useState([]);
  const { quantity, product } = useSelector((state) => state.order);

  const { data: orderData, refetch } = useQuery(ORDER, {
    variables: {
      id: order_id,
    },
  });
  const [updateOrderMutation] = useMutation(UPDATE_ORDER);

  useEffect(() => {
    if (orderData?.order) {
      dispatch(
        setOrderData({
          ...orderData.order,
          product_id: orderData.order.product_id.id,
        })
      );
    }
    if (data?.products) {
      setProducts(data.products);
    }
  }, [orderData?.order, data?.products]);

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateOrderMutation({
        variables: {
          id: order_id,
          data: {
            quantity,
            product_id: product,
          },
        },
      });
      console.log(data);

      dispatch(clearStateHandler());
      await refetch();
      
      navigate("/orders")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="orders" pageName={path} href="/orders" />
      <Form
        headingText="update order"
        update={true}
        submitHandler={updateOrderHandler}
      >
        <div className="flex-col items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 capitalize font-semibold" htmlFor="">
              product
            </label>
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
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 capitalize font-semibold" htmlFor="">
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
      </Form>
      <div className="h-20" />
    </FormWrapper>
  );
};

export default UpdateOrder;
