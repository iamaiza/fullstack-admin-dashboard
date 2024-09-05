import { Form, FormWrapper, Input, Select } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler, setImg } from "../store/productSlice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { productError } from "../components/Errors";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const [suppliers, setSuppliers] = useState([]);
  const { title, quantity, img, purchase_price, sell_price, supplier } = useSelector(
    (state) => state.product
  );

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getAllSuppliers();
    dispatch(clearStateHandler());
  }, []);

  const getAllSuppliers = async () => {
    const res = await axios.get("/api/suppliers_list");
    const data = await res.data;
    if (res.status === 200) {
      setSuppliers(data);
    }
  };

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
      const res = await axios.post("/api/add-product", {
        title,
        img,
        quantity,
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

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
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
                <button
                  className="capitalize text-sm py-1.5 px-3 bg-gray-100 rounded"
                  onClick={removeImgHandler}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
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
