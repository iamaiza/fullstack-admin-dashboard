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
import { changeEventHandler } from "../store/supplierSlice";

const Suppliers = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const { message, type } = useSelector((state) => state.notification);
  const { search } = useSelector((state) => state.supplier);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllSuppliersHandler();
  }, []);

  const getAllSuppliersHandler = async () => {
    const res = await axios.get("/api/suppliers");
    const data = await res.data;
    console.log(data);

    setSuppliers(data);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/add-supplier");
  };

  const deleteSupplierHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/delete-supplier/${id}`);
      if (res.status === 200) {
        console.log(res.data);
        setSuppliers(suppliers.filter((el) => el.id !== id));
        dispatch(setType({ type: "success" }));
        dispatch(setMessage({ message: "Supplier deleted successfully" }));
      } else {
        dispatch(setType({ type: "error" }));
        dispatch(setMessage({ message: res.data?.message }));
      }
    } catch (error) {
      console.log(error);
      dispatch(setType({ type: "error" }));
      dispatch(setMessage({ message: error?.response?.data?.message }));
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
          title="supplier"
          clickHandler={clickHandler}
          name="search"
          value={search}
          eventHandler={changeInputHandler}
        />
        <TableWrapper>
          {suppliers?.length > 0 && (
            <Table>
              <thead>
                <tr className="border-b">
                  <TableHeading heading="id" />
                  <TableHeading heading="name" />
                  <TableHeading heading="address" />
                  <TableHeading heading="phone no." />
                  <TableHeading heading="actions" />
                </tr>
              </thead>
              <tbody>
                {suppliers
                  ?.filter((usr) =>
                    search.toLowerCase() === ""
                      ? usr
                      : usr.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((usr) => (
                    <tr className="border-b last:border-0" key={usr?.id}>
                      <TableData data={usr?.id} />
                      <TableData data={usr?.name} />
                      <TableData data={usr?.address} />
                      <TableData data={usr?.phone} />
                      <TableActions
                        href={`/update-supplier?id=${usr?.id}`}
                        id={usr?.id}
                        deleteHandler={deleteSupplierHandler}
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

export default Suppliers;
