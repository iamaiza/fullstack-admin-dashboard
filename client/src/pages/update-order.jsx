import { useLocation, useNavigate } from "react-router-dom";
import { FormWrapper } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { ORDER, UPDATE_ORDER } from "../query";
import { clearCart, setValues } from "../store/orderSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import OrderUI from "../components/OrderUI";

const UpdateOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const search = new URLSearchParams(location.search);
  const order_id = search.get("id");
  const { data } = useQuery(ORDER, {
    variables: {
      id: order_id,
    },
  });

  const [updateOrderMutation] = useMutation(UPDATE_ORDER);
  const { cart, quantity, total_price } = useSelector((state) => state.order);
  useEffect(() => {
    if (data?.order) {
      dispatch(
        setValues({
          totalQuantity: data.order?.quantity,
          totalPrice: data.order?.price,
          products: data.order?.products?.map((item) => item?.product_id),
        })
      );
    }
  }, [data?.order, dispatch]);

  console.log(data?.order);

  const updateOrderHandler = async () => {
    try {
      await updateOrderMutation({
        variables: {
          id: order_id,
          data: {
            quantity: quantity.toString(),
            price: total_price.toString(),
            products: cart.map((item) => ({
              product_id: item.id,
              quantity: item.quantity.toString(),
            })),
          },
        },
      });

      navigate("/orders");
      // dispatch(clearCart());
      // Cookies.remove("update-cart");
      // Cookies.remove("cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="orders" pageName={path} href="/orders" />
      <div className="mt-5 mx-5">
        <OrderUI
          createdAt={data?.order?.createdAt}
          cart={cart}
          quantity={quantity}
          total_price={total_price}
        />
      </div>
      <div className="w-full absolute bottom-0 py-6 px-5 flex items-center justify-end gap-2">
        <button className="bg-[#ecedee] py-2 px-5 w-32 rounded-md">
          Cancel
        </button>
        <button
          className="bg-linear-gradient text-white py-2 px-5 rounded-md"
          onClick={updateOrderHandler}
        >
          Update Order
        </button>
      </div>
    </FormWrapper>
  );
};

export default UpdateOrder;
