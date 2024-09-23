import { useLocation, useNavigate } from "react-router-dom";
import {
  AddTable,
  Table,
  TableActions,
  TableData,
  TableHeading,
  TableWrapper,
  Wrapper,
} from "../components/Table";
import TitleMenu from "../components/title-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/Notification";
import { setMessage, setType } from "../store/notificationSlice";
// import { changeEventHandler } from "../store/orderSlice";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ORDER, ORDERS } from "../query";
import { format } from "date-fns";

const Orders = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);
  const { search } = useSelector((state) => state.order);
  const { data } = useQuery(ORDERS);
  const [deleteOrderMutation] = useMutation(DELETE_ORDER);

  useEffect(() => {

    if (data?.orders) {
      setOrders(data.orders);
    }
  }, [data?.orders]);

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/add-order");
  };

  const deleteOrderHandler = async (id) => {
    try {
      const { data } = await deleteOrderMutation({
        variables: {
          id,
        },
      });
      setOrders(orders.filter((el) => el.id !== id));
      dispatch(setType({ type: "success" }));
      dispatch(setMessage({ message: "Successfully deleted the order." }));

      if (data.deletedOrder?.message) {
        dispatch(setType({ type: "error" }));
        dispatch({ message: data.deletedOrder.message });
      }
    } catch (error) {
      console.log(error);
      dispatch(setType({ type: "error" }));
      dispatch(setMessage({ message: "Failed to delete order." }));
    }
  };

  // const changeInputHandler = (fieldname, value) => {
  //   dispatch(changeEventHandler({ name: fieldname, value }));
  // };

  const formatDate = (date) => {
    const dateString = new Date(date);
    const month = format(dateString, "MMMM").slice(0, 3);
    return `${format(dateString, "d")} ${month}, ${format(
      dateString,
      "h:mm aa"
    )}`;
  };

  return (
    <div className="px-12 max-[1290px]:px-7">
      <TitleMenu pageType="pages" pageName={path} />
      <Wrapper>
        <AddTable
          title="order"
          clickHandler={clickHandler}
          value={search}
          name="search"
          // eventHandler={changeInputHandler}
        />
        <TableWrapper>
          {orders?.length > 0 && (
            <Table>
              <thead>
                <tr className="border-b">
                  <TableHeading heading="id" />
                  <TableHeading heading="price" />
                  <TableHeading heading="quantity" />
                  <TableHeading heading="created At" />
                  <TableHeading heading="updated At" />
                  <TableHeading heading="actions" />
                </tr>
              </thead>
              <tbody>
                {orders
                  ?.map((ord) => (
                    <tr className="border-b last:border-0" key={ord?.id}>
                      <TableData data={ord?.id} />
                      <TableData data={`$${ord?.price}`} />
                      <TableData data={ord?.quantity} />
                      <TableData data={formatDate(ord?.createdAt)} />
                      <TableData data={formatDate(ord?.updatedAt)} />
                      <TableActions
                        href={`/update-order?id=${ord?.id}`}
                        id={ord?.id}
                        deleteHandler={deleteOrderHandler}
                      />
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
        {orders?.length === 0 && (
          <div className="text-center my-8 font-bold text-gray-400 text-xl">
            No orders available.
          </div>
        )}
      </Wrapper>

      {message && <Notification message={message} type={type} />}
    </div>
  );
};

export default Orders;
