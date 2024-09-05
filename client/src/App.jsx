import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home";
import Products from "./pages/products";
import Suppliers from "./pages/suppliers";
import Orders from "./pages/orders";
import AddProduct from "./pages/add-product";
import AddSupplier from "./pages/add-supplier";
import AddOrder from "./pages/add-order";
import axios from "axios";
import UpdateProduct from "./pages/update-product";
import UpdateSupplier from "./pages/update-supplier";
import UpdateOrder from "./pages/update-order";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [location]);

  return (
    <div className="flex h-screen relative overflow-hidden">
      <Sidebar />
      <div className="max-h-screen h-full flex-grow transition-all duration-500 ml-[17.5rem] max-[1200px]:ml-0 overflow-hidden">
        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center z-10">
            <ClipLoader loading={loading} size={50} />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-supplier" element={<AddSupplier />} />
            <Route path="/add-order" element={<AddOrder />} />
            <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/update-supplier" element={<UpdateSupplier />} />
            <Route path="/update-order" element={<UpdateOrder />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
