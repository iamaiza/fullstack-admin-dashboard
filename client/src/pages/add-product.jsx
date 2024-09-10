import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler } from "../store/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { productError } from "../components/Errors";
import Uploads from "../components/Uploads";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, PRODUCTS, SUPPLIERS } from "../query";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const [suppliers, setSuppliers] = useState([]);
  const { title, quantity, img, purchase_price, sell_price, supplier } =
    useSelector((state) => state.product);
  const [message, setMessage] = useState("");
  const { data } = useQuery(SUPPLIERS)
  const [createProductMutation] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: PRODUCTS }],
  });

  useEffect(() => {
    if(data?.suppliers) {
      setSuppliers(data.suppliers)
    }
    dispatch(clearStateHandler());
  }, [data?.suppliers]);

  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      const error = productError({
        title,
        quantity,
        purchase_price,
        sell_price,
        supplier,
        setMessage,
      });
      if (error) return;
      await createProductMutation({
        variables: {
          data: {
            title,
            quantity,
            img,
            purchase_price,
            sell_price,
            supplier_id: supplier,
          }
        }
      })
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="products" pageName={path} href="/products" />
      <Form headingText="add product" submitHandler={addProductHandler}>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Title"
            name="title"
            value={title}
            changeInputHandler={changeInputHandler}
          />
          <Input
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            changeInputHandler={changeInputHandler}
          />
        </div>
        <Uploads />
        <div className="flex items-center gap-3">
          <Input
            placeholder="Purchase Price"
            name="purchase_price"
            value={purchase_price}
            changeInputHandler={changeInputHandler}
          />
          <Input
            placeholder="Sell Price"
            name="sell_price"
            value={sell_price}
            changeInputHandler={changeInputHandler}
          />
        </div>

        <Select
          name="supplier"
          value={supplier}
          changeInputHandler={changeInputHandler}
        >
          <option selected hidden>
            Supplier
          </option>
          {suppliers?.map((usr) => (
            <option key={usr.id} value={usr.id}>
              {usr.name}
            </option>
          ))}
        </Select>
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};

export default AddProduct;
