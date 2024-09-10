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
import { useMutation, useQuery } from "@apollo/client";
import { SUPPLIER, UPDATE_SUPPLIER } from "../query";

const UpdateSupplier = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const path = pathname.slice(1);
  const searchParams = new URLSearchParams(location?.search);
  const user_id = searchParams.get("id");

  const { username, address, phone } = useSelector((state) => state.supplier);

  const { data, refetch } = useQuery(SUPPLIER, {
    variables: {
      id: user_id,
    },
  });
  const [updateSupplierMutation] = useMutation(UPDATE_SUPPLIER);

  useEffect(() => {
    console.log(data?.supplier);
    
    if (data?.supplier) {
      dispatch(setSupplierData(data.supplier));
    }
  }, [data?.supplier]);

  const changeInputHandler = (fieldname, value) => {
    dispatch(changeEventHandler({ name: fieldname, value }));
  };

  const updateSupplierHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateSupplierMutation({
        variables: {
          id: user_id,
          data: {
            name: username,
            address,
            phone,
          },
        },
      });

      if(data.updatedSupplier?.message) {
        alert(data.updatedSupplier.message);
      }

      dispatch(clearStateHandler());
      await refetch();

      navigate("/suppliers");
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
              value={username}
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
              value={address}
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
            value={phone}
            changeInputHandler={changeInputHandler}
          />
        </div>
      </Form>
      <div className="h-20" />
    </FormWrapper>
  );
};

export default UpdateSupplier;
