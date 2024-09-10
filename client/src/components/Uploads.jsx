import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFile, setImg } from "../store/productSlice";

const Uploads = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { img } = useSelector((state) => state.product);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      dispatch(setFile(selectedFile));
      // setFile(selectedFile)
      const data = new FormData();
      data.append("file", selectedFile);
      try {
        const uploadImg = await axios.post("/api/upload-img", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imgUrl = uploadImg.data?.filePath;
        const url = `http://localhost:3000${imgUrl}`;
        dispatch(setImg({ imgUrl: url }));
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
    dispatch(setImg({ imgUrl: "" }));
  };
  return (
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
  );
};

export default Uploads;
