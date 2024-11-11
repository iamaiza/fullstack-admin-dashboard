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
import { changeEventHandler } from "../store/supplierSlice";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SUPPLIER, SUPPLIERS } from "../query";

const Suppliers = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const navigate = useNavigate();
  const { message, type } = useSelector((state) => state.notification);
  const { search } = useSelector((state) => state.supplier);
  const dispatch = useDispatch();
  const { data } = useQuery(SUPPLIERS);
  const [suppliers, setSuppliers] = useState([]);
  const [deleteSupplierMutation] = useMutation(DELETE_SUPPLIER);

  useEffect(() => {
    if (data?.suppliers) {
      setSuppliers(data.suppliers);
    }
  }, [data?.suppliers]);

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/add-supplier");
  };

  const deleteSupplierHandler = async (id) => {
    try {
      const { data } = await deleteSupplierMutation({
        variables: {
          id,
        },
      });
      if (data.deletedSupplier?.message) {
        dispatch(setType({ type: "error" }));
        dispatch(setMessage({ message: data.deletedSupplier.message }));
      }
      setSuppliers(suppliers.filter((el) => el.id !== id));
      dispatch(setType({ type: "success" }));
      dispatch(setMessage({ message: "Supplier deleted successfully" }));
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
    <div className="px-12 max-[1290px]:px-7 pb-20 overflow-auto max-h-screen">
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
                    <tr className="border-b last:border-0" key={usr.id}>
                      <TableData data={usr.id} />
                      <TableData data={usr.name} />
                      <TableData data={usr.address} />
                      <TableData data={usr.phone} />
                      <TableActions
                        href={`/update-supplier?id=${usr.id}`}
                        id={usr.id}
                        deleteHandler={deleteSupplierHandler}
                      />
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
        {suppliers?.length <= 0 && (
          <p className="text-lg text-gray-500 font-semibold pt-8 pb-5 text-center px-3">
            No supplier available.
          </p>
        )}
      </Wrapper>
      {message && <Notification message={message} type={type} />}
    </div>
  );
};

export default Suppliers;
