import { useEffect, useState } from "react";
import { PRODUCTS } from "../query";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, hideList, setOrder, setSearch, showList, toggleList } from "../store/orderSlice";
import { CloseIcon } from "../icons/tableIcons";
import CartTBody from "./Cart";
import {DropdownIcon} from "../icons";

const OrderUI= (props) => {

  const dispatch = useDispatch()
  const { data } = useQuery(PRODUCTS)
  const { shop, search } = useSelector(state => state.order);
  const { createdAt, cart, quantity, total_price } = props;

  return (
    <>
      <table className="w-full max-md:max-w-3xl max-md:w-full overflow-x-auto">
          <thead className="h-12">
            <tr className="bg-[#ecedee]">
              <th className="uppercase text-xs text-gray-500 font-medium px-5 py-2.5 text-left">
                products
              </th>
              <th className="uppercase text-xs text-gray-500 font-medium px-6 py-2.5 text-left">
                price
              </th>
              <th className="uppercase text-xs text-gray-500 font-medium px-7 py-2.5 text-left">
                quantity
              </th>
              <th className="uppercase text-xs text-gray-500 font-medium px-4 py-2.5 text-left">
                total price
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.length > 0 &&
              cart?.map((item) => (
                <CartTBody
                  key={item?.id}
                  item={item}
                />
              ))}
          </tbody>
        </table>
        <div className="flex gap-5 items-start">
          <div className="px-5 my-5 relative h-full flex-1">
            <h3 className="font-semibold capitalize text-lg py-2">general</h3>
            <div
              className="bg-white flex items-center gap-2 justify-between px-3 py-2"
              onClick={() => dispatch(toggleList())}
            >
              <input
                className="w-full bg-transparent"
                type="text"
                placeholder="Search product"
                value={search}
                onChange={(e) => {
                  dispatch(setSearch(e.target.value))
                  dispatch(showList())
                }}
              />
              <div className={shop && "rotate-180"}>
                <DropdownIcon />
              </div>
            </div>
            {shop && (
              <ul className="bg-white mt-1 absolute w-[89.5%] max-h-96 h-full overflow-auto">
                {data?.products
                  ?.filter((item) =>
                    item?.title.toLowerCase().includes(search.toLowerCase())
                  )
                  ?.map((item) => (
                    <li
                      key={item?.id}
                      className="py-3 cursor-pointer flex items-center justify-between px-2"
                      onClick={() => {
                        dispatch(setOrder({ product: item, quantity: 1 }));
                        dispatch(hideList());
                        dispatch(clearSearch());
                      }}
                    >
                      <figure className="flex items-center gap-2">
                        <img className="w-8" src={item?.img} alt="" />
                        <div className="text-sm flex flex-col gap-1 capitalize">
                          <span>{item?.title}</span>
                          <span className="text-xs text-gray-500">
                            Qty: {item?.quantity}
                          </span>
                        </div>
                      </figure>
                      <div>
                        <div className="text-[13px] font-semibold">
                          ${item?.sell_price}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
            <p className="my-5 capitalize text-sm">
              status: <span className="font-semibold text-base">recieved</span>
            </p>
            <p className="capitalize text-sm">
              order date:{" "}
              <span className="font-semibold text-base">
                {createdAt?.split('T')[0]}
              </span>
            </p>
          </div>
          <div className="flex-1 pl-12 flex flex-col gap-3 my-5">
            <h3 className="font-semibold capitalize text-lg py-2 mt-1">
              Summary
            </h3>
            <p className=" capitalize text-sm">
              total quantity:{" "}
              <span className="text-base font-semibold ml-2">{quantity}</span>
            </p>
            <p className=" capitalize text-sm">
              total price:{" "}
              <span className="text-base font-semibold ml-2">
                ${total_price}
              </span>
            </p>
          </div>
        </div>
    </>
  );
};

export default OrderUI;
