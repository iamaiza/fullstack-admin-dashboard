import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { changeEventHandler, clearStateHandler } from "../store/supplierSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { supplierError } from "../components/Errors";
import { useEffect, useState } from "react";

const AddSupplier = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const { username, address, phone } = useSelector((state) => state.supplier);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(clearStateHandler());
  }, []);

  const createSupplierHandler = async (e) => {
    e.preventDefault();
    try {
      const error = supplierError({
        name: username,
        address,
        phone,
        setMessage,
      });
      if (error) return;

      const res = await axios.post("/api/add-supplier", {
        name: username,
        address,
        phone,
      });
      if (res.data?.message) {
        setMessage(res.data.message);
      }
        if (res.status === 200) {
          navigate("/suppliers");
          // dispatch(clearStateHandler());
        }
      
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  return (
    <FormWrapper>
      <TitleMenu pageType="suppliers" pageName={path} href="/suppliers" />
      <Form headingText="add supplier" submitHandler={createSupplierHandler}>
        <Input
          placeholder="Name"
          name="username"
          value={username}
          changeInputHandler={changeInputHandler}
        />
        <Input
          placeholder="Address"
          name="address"
          value={address}
          changeInputHandler={changeInputHandler}
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          name="phone"
          value={phone}
          changeInputHandler={changeInputHandler}
        />
        {message && (
          <div className="text-red-500 my-2 text-sm font-semibold">
            {message}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};

export default AddSupplier;
