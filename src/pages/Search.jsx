import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import api from "api";
import Card from "../components/Card";
// import authHeader from "../services/auth-header";
import api from "../services/api"
import Loading from "../components/Loading";
import * as loadingData from "../loading/rainbow.json"
import Swal from 'sweetalert2'

const Search = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState();

  const fetchData = async () => {
    setLoading(true);  // Set loading to true before fetching data
    try {
      const res = await api.get(`/products`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);  // Set loading to false after fetching data
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/products/${id}`);
          await Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    })
  };


  return (
    <div className="search-container">
      <h1>Product Management</h1>
      <input className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {
        !loading ? (data
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
          )

          .map((filteredProduct, index) => (
            <Card key={index} product={filteredProduct} handleDelete={handleDelete} />
          ))) : (
          <Loading animation={{ ...loadingData }} />
        )
      }
    </div>
  );
}

export default Search;