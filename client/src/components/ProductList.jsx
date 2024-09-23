import { useEffect, useState } from "react";
import { PRODUCTS } from "../query";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { hideList, setOrder } from "../store/orderSlice";
import { CloseIcon } from "../icons/tableIcons";

const ProductList = () => {
  const { data } = useQuery(PRODUCTS);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { shop } = useSelector(state => state.order)

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data?.products]);

  const addToCartHandler = (product) => {
    dispatch(setOrder({ product, quantity: 1 }));
  };

  return (
    <>
      <div className="absolute inset-0" onClick={() => dispatch(hideList())} />
      <div className={`bg-white shadow-lg absolute top-0 bottom-0 right-0 max-w-sm w-full p-5 max-h-screen h-full overflow-y-auto transition-all duration-200 ${shop && "slide-in"}`}>
        <div className="flex items-center gap-3 justify-between border-b">
          <h3 className="text-lg py-5 font-semibold text-gray-600">
            Products List
          </h3>
          <div className="w-6 h-6 rounded-full hover:bg-[#f0eded] flex justify-center items-center" onClick={() => dispatch(hideList())}>
            <CloseIcon />
          </div>
        </div>
        {products?.length > 0 &&
          products?.map((prod) => (
            <div
              key={prod?.id}
              className="bg-white px-3 py-5 rounded-lg border-b mt-5"
            >
              <div className="flex items-center gap-3">
                <figure className="w-14">
                  <img className="w-full object-cover" src={prod?.img} alt="" />
                </figure>
                <div>
                  <h3 className="font-semibold capitalize text-gray-600">
                    {prod?.title}
                  </h3>
                  <div className="mt-1 text-sm">
                    <p className="flex items-center gap-1">
                      <span className="capitalize font-semibold text-gray-400">
                        price:
                      </span>
                      <span>${prod?.sell_price}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="capitalize font-semibold text-gray-400">
                        quantity:
                      </span>
                      <span>{prod?.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-5 text-right cursor-pointer"
                onClick={() => addToCartHandler(prod)}
              >
                <span className="px-5 py-1.5 bg-gray-100">Add order</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductList;
