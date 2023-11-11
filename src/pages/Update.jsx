import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api"
import Loading from "../components/Loading";
import * as loadingData from "../loading/rainbow.json"
import Swal from 'sweetalert2'

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

const Update = () => {
  const [product, setProduct] = useState({
    title: "",
    imagePath: "",
    description: "",
    price: "",
    category: ""
  });

  //const [isCommaPresent, setIsCommaPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { productId } = useParams();

  const convertPriceToDecimal = (priceString) => {
    return parseFloat(priceString.replace(/,/g, ''));
  }


  // const handleChange = (e) => {
  //   setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // const commaPresent = value.includes(',');
    // setIsCommaPresent(commaPresent);
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setLoading(true);  // Start loading before the try-catch block
    const fetchAllProduct = async () => {
      try {
        const res = await api.get(
          `/products/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false); // Stop loading after the try-catch block is done
    };
    fetchAllProduct();
  }, [productId]);

  // const isFormComplete = () => {
  //   return Object.values(product).every(fieldValue => fieldValue.trim() !== '');
  // };

  const isFormComplete = () => {
    return Object.values(product).every(fieldValue => fieldValue.toString().trim() !== '');
  };


  const handleClick = async (e) => {
    e.preventDefault();
    // if (isCommaPresent) {
    //   alert('กรุณาเอาเครื่องหมายจุลภาคหรือลูกน้ำออกจากใน Product Price');//Please remove commas from the product price.
    //   return;
    // } 
    setLoading(true);  // Start loading before the try-catch block
    if (!isFormComplete()) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    try {
      product.price = convertPriceToDecimal(product.price);

      await api.put(`/products/${productId}`, product);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      {
        !loading ? (
          <div className="row form">
            <div className="col-6 card justify-content-center">
              <h5 className="card-header">Update product</h5>
              <div className="error">{error && "Somthing went wrong !!"}</div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Product Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Product Title"
                      onChange={handleChange}
                      value={product.title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Product Image Path</label>
                    <input
                      type="text"
                      className="form-control"
                      name="imagePath"
                      placeholder="Product Image Path"
                      onChange={handleChange}
                      value={product.imagePath}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Product Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Product Description"
                      onChange={handleChange}
                      value={product.description}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Product Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="Product Price"
                      onChange={handleChange}
                      value={product.price}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Product Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      placeholder="Product Category"
                      onChange={handleChange}
                      value={product.category}
                    />
                  </div>
                  {/* <Link to="" className="btn btn-success" onClick={handleClick}>
                Update
              </Link>{" "} */}

                  <Link to="" className={`btn btn-success ${!isFormComplete() ? 'disabled' : ''}`} onClick={handleClick}>
                    Update
                  </Link>{" "}
                  <Link to="/" className="btn btn-danger">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // <Loading animation={loadingData}/>
          <Loading animation={{ ...loadingData }} />
        )
      }
    </div>
  );
};

export default Update;
