"use client";

export const FormWrapper = ({ children }) => {
  return (
    <div className="max-h-screen h-full overflow-y-auto overflow-x-hidden pb-14 relative">{children}</div>
  );
};

export const Form = (props) => {
  const { children, headingText, submitHandler, update } = props;
  return (
    <form className={`mx-auto w-[95%] relative shadow-xl py-12 bg-white px-8 rounded-xl mt-20 max-w-xl`} onSubmit={submitHandler}>
      <div className="capitalize text-center text-gray-600 font-bold text-lg mb-8">
        {headingText}
      </div>
      {children}
      <button className="block w-full add-btn text-white py-2 px-3 capitalize rounded-lg">
        {update ? "update" : "add"}
      </button>
    </form>
  );
};

export const Select = ({ children, value, name, changeInputHandler }) => {
  const changeHandler = (e) => {
    changeInputHandler(name, e.target.value);
  }
  return (
    <select
      className="block w-full bg-transparent border mb-3.5 py-1.5 px-3 rounded-md text-sm"
      value={value}
      onChange={changeHandler}
      name={name}
    >
      {children}
    </select>
  );
};

export const Input = (props) => {
  const { type, placeholder, value, name, changeInputHandler } = props;

  const changeHandler = (e) => {
    changeInputHandler(name, e.target.value)
  }
  return (
    <input
      className="block w-full bg-transparent border mb-3.5 py-1.5 px-3 rounded-md text-sm"
      type={type === "tel" ? type : "text"}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={changeHandler}
    />
  );
};
