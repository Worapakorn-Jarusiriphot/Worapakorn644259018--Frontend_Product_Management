import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import api from "api";
import Card from "../components/Card";
// import authHeader from "../services/auth-header";
import api from "../services/api"

// const URL = "http://localhost:5000";  // แทนที่ด้วย URL ของเซิร์ฟเวอร์ของคุณ
// const USERNAME = "root";     // แทนที่ด้วย username ของคุณ
// const PASSWORD = null;     // แทนที่ด้วย password ของคุณ
// // const URL = import.meta.env.VITE_BASE_URL;
// // const USERNAME = import.meta.env.VITE_BASE_USERNAME;
// // const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
// const config = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
//   headers: authHeader(),
// };

const Search = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchData = async () => {
    try {
      const res = await api.get(`/products`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
const handleDelete = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    fetchData();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


return (
    <div className="search-container">
      <h1>Product</h1>
      <input className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {data
        .filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )

        .map((filteredProduct, index) => (
          <Card key={index} product={filteredProduct} handleDelete={handleDelete} />
        ))}
    </div>
  );
}

export default Search;