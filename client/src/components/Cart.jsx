import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, setOrder } from "../store/orderSlice";

const CartTBody = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  return (
    <Fragment>
      <tr className="border-b" key={item?.id}>
        <td className="px-5 py-5 flex items-center">
          <div>
            <figure className="flex items-center gap-3">
              <img className="w-12" src={item?.img} alt="" />
              <figcaption className="text-sm capitalize text-nowrap">
                {item?.title}
              </figcaption>
            </figure>
          </div>
        </td>
        <td className="px-5 py-5">${item?.sell_price}</td>
        <td className="px-5 py-5 ">
          <div className="flex items-center gap-4 border rounded-full w-fit p-0.5">
            <span
              className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => dispatch(deleteFromCart({ id: item?.id }))}
            >
              {item?.quantity === 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-3.5 stroke-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              ) : (
                "-"
              )}
            </span>
            <span>{item?.quantity}</span>
            <span
              className="w-5 h-5 pb-1 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => dispatch(setOrder({ product: item, quantity: 1 }))}
            >
              +
            </span>
          </div>
        </td>
        <td className="px-5 py-5">${parseInt(item?.sell_price) * parseInt(item?.quantity)}</td>
      </tr>
    </Fragment>
  );
};

export default CartTBody;
