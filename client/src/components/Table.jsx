import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../icons/tableIcons";

export const Wrapper = ({ children }) => {
  return (
    <div className="mt-16 bg-white max-w-full overflow-auto py-8 rounded-2xl shadow-xl">
      {children}
    </div>
  );
};

export const AddTable = (props) => {
  const { title, clickHandler, value, name, eventHandler } = props;
  return (
    <div className="px-8 flex items-center justify-between gap-5 py-5 max-[992px]:flex-col max-[992px]:items-start">
      <div className="capitalize text-slate-700 font-semibold">all {title}</div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          className="uppercase add-new text-white bg-linear-gradient py-2 px-5 rounded-md text-xs font-bold"
          onClick={clickHandler}
        >
          + new {title}
        </button>
        <input
          type="text"
          placeholder="Search"
          name={name}
          value={value}
          onChange={(e) => eventHandler(name, e.target.value)}
          className="text-sm border py-1.5 px-2 rounded max-[330px]:w-full"
        />
      </div>
    </div>
  );
};

export const TableWrapper = ({ children }) => {
  return <div>{children}</div>;
};

export const Table = ({ children }) => {
  return <table className="w-full mt-8 max-lg:w-[1024px]">{children}</table>;
};

export const TableHeading = ({ heading }) => {
  return <th className="capitalize text-sm text-left py-3 px-5">{heading}</th>;
};

export const TableData = ({ data }) => {
  return <td className="py-3 px-5 text-sm capitalize">{data}</td>;
};

export const TableActions = ({ href, deleteHandler, id }) => {
  const deleteTrHandler = (e) => {
    e.preventDefault();
    deleteHandler(id);
  };
  return (
    <td className="py-3 px-5 text-sm">
      <div className="flex items-center gap-3">
        <button className="delete" onClick={deleteTrHandler}>
          <DeleteIcon />
        </button>
        <Link to={href} className="edit">
          <EditIcon />
        </Link>
      </div>
    </td>
  );
};
