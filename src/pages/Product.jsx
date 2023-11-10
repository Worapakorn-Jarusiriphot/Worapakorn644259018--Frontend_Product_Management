import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Card from "../components/Card";
// import authHeader from "../services/auth-header";
import api from "../services/api"

// const URL = "http://localhost:5000";  // แทนที่ด้วย URL ของเซิร์ฟเวอร์ของคุณ
// const USERNAME = "root";     // แทนที่ด้วย username ของคุณ
// const PASSWORD = null;     // แทนที่ด้วย password ของคุณ
// // const URL = import.meta.env.VITE_BASE_URL;
// // const USERNAME = import.meta.env.VITE_BASE_USERNAME;
// // const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
// const  = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
//   headers: authHeader(),
// };

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await api.get(`/products` );
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}` );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Product</h1>
      <div className="row">
        <div className="products">
          {products.map((product) => {
            return (
              <Card
                product={product}
                handleDelete={handleDelete}
                key={product.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
