import { useDispatch } from "react-redux";
import { CloseIcon } from "../icons/tableIcons";
import { closeNotification, hideNotification } from "../store/notificationSlice";
import { useEffect } from "react";

const Notification = ({ message, type }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(hideNotification());
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const closeNotificationHandler = () => {
    dispatch(closeNotification());
  };

  return (
    <div
      className={`absolute bottom-2 right-0 mr-12  py-3 min-h-24 px-5 max-w-sm w-full transition-all duration-400 notification max-[1200px]:mr-7 z-10 rounded-lg overflow-hidden ${type === "error" ? "bg-red-100 before:bg-red-400 after:bg-red-400" : "bg-green-100 before:bg-green-400 after:bg-green-400"}`}
    >
      <div className={`right-side ${type === "error" ? "bg-red-400" : "bg-green-400"}`} />
      <div className={`top-side ${type === "error" ? "bg-red-400" : "bg-green-400"}`} />
      <div
        className="w-fit ml-auto mb-2 cursor-pointer"
        title="Close"
        onClick={closeNotificationHandler}
      >
        <CloseIcon />
      </div>
      {message}
    </div>
  );
};

export default Notification;
