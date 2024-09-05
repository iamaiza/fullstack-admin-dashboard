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
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/Notification";
import { setMessage, setType } from "../store/notificationSlice";
import { changeEventHandler } from "../store/orderSlice";

const Orders = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);
  const { search } = useSelector((state) => state.order);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    const res = await axios.get("/api/orders");
    const data = await res.data;

    if (res.status === 200) {
      setOrders(data);
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/add-order");
  };

  const deleteOrderHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/delete-order/${id}`);
      if (res.status === 200) {
        console.log(res.data);
        setOrders(orders.filter((el) => el.id !== id));

        dispatch(setType({ type: "success" }));
        dispatch(setMessage({ message: "Successfully deleted the order." }));
      } else {
        dispatch(setType({ type: "error" }));
        dispatch({ message: res.data?.message });
      }
    } catch (error) {
      console.log(error);
      dispatch(setType({ type: "error" }));
      dispatch(setMessage({ message: error.response?.data?.message }));
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
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
          eventHandler={changeInputHandler}
        />
        <TableWrapper>
          {orders?.length > 0 && (
            <Table>
              <thead>
                <tr className="border-b">
                  <TableHeading heading="id" />
                  <TableHeading heading="product" />
                  <TableHeading heading="quantity" />
                  <TableHeading heading="actions" />
                </tr>
              </thead>
              <tbody>
                {orders
                  ?.filter((ord) =>
                    search.toLowerCase() === ""
                      ? ord
                      : ord.product.title
                          .toLowerCase()
                          .includes(search.toLowerCase())
                  )
                  .map((ord) => (
                    <tr className="border-b last:border-0" key={ord?.id}>
                      <TableData data={ord?.id} />
                      <TableData data={ord?.product?.title} />
                      <TableData data={ord?.quantity} />
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
      </Wrapper>

      {message && <Notification message={message} type={type} />}
    </div>
  );
};

export default Orders;
