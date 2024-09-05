import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormWrapper, Input } from "../components/Form";
import TitleMenu from "../components/title-menu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  changeEventHandler,
  clearStateHandler,
  setSupplierData,
} from "../store/supplierSlice";
import { useEffect } from "react";

const UpdateSupplier = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const path = pathname.slice(1);
  const searchParams = new URLSearchParams(location?.search);
  const user_id = searchParams.get("id");

  const state = useSelector((state) => ({
    name: state.supplier.username,
    address: state.supplier.address,
    phone: state.supplier.phone,
  }));

  useEffect(() => {
    getSupplier();
    dispatch(clearStateHandler());
  }, []);

  const getSupplier = async () => {
    try {
      const res = await axios.get(`/api/suppliers/${user_id}`);
      const data = await res.data;

      if (res.status === 200) {
        dispatch(setSupplierData(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateSupplierHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/update-supplier/${user_id}`, {
        name: state.name,
        address: state.address,
        phone: state.phone,
      });

      if (res.status === 200) {
        navigate("/suppliers");
        // dispatch(clearStateHandler())
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormWrapper>
      <TitleMenu pageType="suppliers" pageName={path} href="/suppliers" />
      <Form
        headingText="update supplier"
        update={true}
        submitHandler={updateSupplierHandler}
      >
        <div className="flex items-center gap-5 max-sm:flex-col">
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 capitalize font-semibold" htmlFor="">
              name
            </label>
            <Input
              placeholder="Name"
              name="username"
              value={state.name}
              changeInputHandler={changeInputHandler}
            />
          </div>
          <div className="flex-1 max-sm:w-full">
            <label className="block mb-1.5 capitalize font-semibold" htmlFor="">
              address
            </label>
            <Input
              placeholder="Address"
              name="address"
              value={state.address}
              changeInputHandler={changeInputHandler}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1.5 capitalize font-semibold" htmlFor="">
            phone no.
          </label>
          <Input
            placeholder="Phone Number"
            type="tel"
            name="phone"
            value={state.phone}
            changeInputHandler={changeInputHandler}
          />
        </div>
      </Form>
      <div className="h-20" />
    </FormWrapper>
  );
};

export default UpdateSupplier;
