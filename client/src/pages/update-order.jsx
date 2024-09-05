import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeEventHandler, clearStateHandler, setOrderData } from "../store/orderSlice";

const UpdateOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const search = new URLSearchParams(location.search);
  const order_id = search.get("id");

  const [products, setProducts] = useState([]);
  const state = useSelector((state) => ({
    quantity: state.order.quantity,
    product: state.order.product,
  }));

  useEffect(() => {
    getOrder();
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

  const getOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${order_id}`);
      const data = await res.data;

      if (res.status === 200) {
        dispatch(setOrderData(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/update-order/${order_id}`, {
        quantity: state.quantity,
        product: state.product,
      });

      if(res.status === 200) {
        navigate('/orders')
        // dispatch(clearStateHandler());
      }

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
              value={state.product}
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
              value={state.quantity}
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
