"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { FormWrapper } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER, ORDERS } from "../query";
import OrderUI from "../components/OrderUI";

const AddOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [createOrderMutation] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: ORDERS }],
  });

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const { cart, quantity, total_price } = useSelector(
    (state) => state.order
  );

  // useEffect(() => {
  //   const cartData = Cookies.get("cart");
  //   if (!cartData) {
  //     dispatch(clearCart());
  //   }
  // }, []);

  const addOrderHandler = async (e) => {
    e.preventDefault();
    try {
      if (total_price === "" || quantity === "" || cart.length <= 0) {
        alert("Please select a product for order.");
        return;
      }

      const createOrder = {
        price: total_price.toString(),
        quantity: quantity.toString(),
        products: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity.toString(),
        })),
      };


      await createOrderMutation({
        variables: {
          data: createOrder,
        },
      });
      // Cookies.remove("cart");
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="orders" pageName={path} href="/orders" />
      <div className="px-5 flex gap-5">
        <div className="mt-12 flex-1">
            <h2 className="capitalize font-semibold text-xl text-gray-500 mb-6">
              shopping cart
            </h2>
            <OrderUI cart={cart} quantity={quantity} total_price={total_price} createdAt={new Date().toISOString()} />
        </div>
      </div>
      <div className="w-full absolute bottom-0 py-6 px-5 flex items-center justify-end gap-2">
        <button className="bg-[#ecedee] py-2 px-5 w-32 rounded-md">
          Cancel
        </button>
        <button
          className="bg-linear-gradient text-white py-2 px-5 rounded-md"
          onClick={addOrderHandler}
        >
          Create Order
        </button>
      </div>
    </FormWrapper>
  );
};

export default AddOrder;
