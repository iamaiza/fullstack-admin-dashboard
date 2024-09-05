"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductData,
  changeEventHandler,
  clearStateHandler,
  setImg,
} from "../store/productSlice";
import {productError} from "../components/Errors";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1).replace(/%20/g, " ");

  const searchParams = new URLSearchParams(location?.search);
  const prodId = searchParams.get("id");

  const [suppliers, setSuppliers] = useState([]);
  const { title, quantity, img, purchase_price, sell_price, supplier } =
    useSelector((state) => state.product);
    const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  // const [photo, setPhoto] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    getProduct();
    getAllSuppliers();
    dispatch(clearStateHandler());
  }, []);

  const getAllSuppliers = async () => {
    const res = await axios.get("/api/all_suppliers");
    const data = await res.data;

    if (res.status === 200) {
      setSuppliers(data);
    }
  };
  const getProduct = async () => {
    const res = await axios.get(`/api/products/${prodId}`);
    const data = await res.data;

    if (res.status === 200) {
      dispatch(setProductData(data));
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateProductHandler = async (e) => {
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
      const res = await axios.put(`/api/update-product/${prodId}`, {
        title,
        quantity,
        img,
        purchase_price,
        sell_price,
        supplier,
      });

      if (res.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      dispatch(setImg({ imgUrl: URL.createObjectURL(selectedFile) }));
      const data = new FormData();
      data.append("file", selectedFile);
      try {
        const uploadImg = await axios.post("/api/upload-img", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imgUrl = uploadImg.data.filePath;
        dispatch(setFile({ imgUrl: imgUrl }));
        console.log(imgUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const selectFileFromLSHandler = () => {
    fileRef.current?.click();
  };

  const removeImgHandler = (e) => {
    e.preventDefault();
    dispatch(setImg({ imgUrl: "" }))
  }

  return (
    <FormWrapper>
      <TitleMenu pageType="products" pageName={path} href="/products" />
      <Form
        headingText="Update product"
        update={true}
        submitHandler={updateProductHandler}
      >
        <div className="flex items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              title
            </label>
            <Input
              placeholder="Title"
              name="title"
              value={title}
              changeInputHandler={changeInputHandler}
            />
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              quantity
            </label>
            <Input
              placeholder="Quantity"
              name="quantity"
              value={quantity}
              changeInputHandler={changeInputHandler}
            />
          </div>
        </div>
        <div className="min-h-32 border rounded-md mb-3 flex flex-col justify-center items-center gap-2 text-[15px] py-5 px-3">
          {!img ? (
            <div>
              Drop file to attach or
              <span
                className="text-blue-600 ml-1 cursor-pointer"
                onClick={selectFileFromLSHandler}
              >
                browse
              </span>
              <input
                type="file"
                className="hidden"
                name="file"
                ref={fileRef}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <>
              <img className="h-32" src={img} alt="" />
              <div className="flex items-center gap-2 ml-auto">
                <div>
                  <button
                    className="capitalize text-sm py-1.5 px-6 bg-gray-100 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      selectFileFromLSHandler();
                    }}
                  >
                    edit
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    name="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                  />
                </div>
                <button className="capitalize text-sm py-1.5 px-3 bg-gray-100 rounded" onClick={removeImgHandler}>Remove</button>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              purchase price
            </label>
            <Input
              placeholder="Purchase Price"
              name="purchase_price"
              value={purchase_price}
              changeInputHandler={changeInputHandler}
            />
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
              sell price
            </label>
            <Input
              placeholder="Sell Price"
              name="sell_price"
              value={sell_price}
              changeInputHandler={changeInputHandler}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1.5 font-semibold capitalize" htmlFor="">
            supplier
          </label>
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
        </div>
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
      <div className="h-20" />
    </FormWrapper>
  );
};

export default UpdateProduct;
