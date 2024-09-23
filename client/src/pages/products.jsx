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
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessage,
  setType,
  showNotification,
} from "../store/notificationSlice";
import { productDeletionSuccess } from "../lib";
import { changeEventHandler } from "../store/productSlice";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, PRODUCTS } from "../query";

const Products = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);
  const { data } = useQuery(PRODUCTS);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => ({
    message: state.notification.message,
    type: state.notification.type,
  }));
  const { search } = useSelector((state) => state.product);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  useEffect(() => {
    // getAllProducts();
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data?.products]);

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/add-product");
    localStorage.setItem(
      "active-link",
      JSON.stringify({ activeLink: "add product" })
    );
  };

  const deleteProductHandler = async (id) => {
    try {
      const { data } = await deleteProductMutation({
        variables: {
          id,
        },
      });
      if (data.deletedProduct?.message) {
        dispatch(setType({ type: "error" }));
        dispatch(showNotification());
        dispatch(setMessage(data.deletedProduct.message));
      }

      setProducts(products.filter((el) => el.id !== id));
      dispatch(setType({ type: "success" }));
      dispatch(setMessage({ message: productDeletionSuccess }));
    } catch (error) {
      console.log(error);
      dispatch(setType({ type: "error" }));
      dispatch(showNotification());
      dispatch(
        setMessage({
          message: "Failed to delete product.",
        })
      );
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
          title="product"
          clickHandler={clickHandler}
          value={search}
          name="search"
          eventHandler={changeInputHandler}
        />
        <TableWrapper>
          {products?.length > 0 && (
            <Table>
              <thead>
                <tr className="border-b">
                  <TableHeading heading="id" />
                  <TableHeading heading="title" />
                  <TableHeading heading="quantity" />
                  <TableHeading heading="purchase" />
                  <TableHeading heading="sell" />
                  <TableHeading heading="supplier" />
                  <TableHeading heading="actions" />
                </tr>
              </thead>
              <tbody>
                {products
                  ?.filter((prod) =>
                    search.toLowerCase() === ""
                      ? prod
                      : prod.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((prod) => (
                    <tr className="border-b last:border-0" key={prod?.id}>
                      <TableData data={prod?.id} />
                      <td className="py-3 px-5 text-sm capitalize flex items-center gap-2">
                        {prod?.img && (
                          <figure className="w-14">
                            <img
                              className="w-full object-cover"
                              src={prod?.img}
                              alt=""
                            />
                          </figure>
                        )}
                        <span>{prod?.title}</span>
                      </td>
                      <TableData data={prod?.quantity} />
                      <TableData data={`$${prod?.purchase_price}`} />
                      <TableData data={`$${prod?.sell_price}`} />
                      <TableData data={prod?.supplier_id?.name} />
                      <TableActions
                        href={`/update-product?id=${prod?.id}`}
                        deleteHandler={deleteProductHandler}
                        id={prod?.id}
                      />
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
        {products?.length === 0 && (
          <div className="text-center my-8 font-bold text-gray-400 text-xl">No products available.</div>
        )}
      </Wrapper>
      {state.message && (
        <Notification message={state.message} type={state.type} />
      )}
    </div>
  );
};

export default Products;
