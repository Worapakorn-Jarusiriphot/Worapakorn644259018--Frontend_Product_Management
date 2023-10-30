import { Link } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Card = ({ product, handleDelete }) => {
  const { user } = useAuthContext();
  
  function formatPrice(value) {
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? '' : numericValue.toLocaleString();
  }

  return (
    <div className="card" key={product.id}>
      <img src={product.imagePath} alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <div >
          <p className="card-text">Category: {product.category}</p>
          <p className="card-text">{formatPrice(product.price)} ฿</p>
        </div>
        {user && user.roles.includes("ROLES_ADMIN") && (
          <div >
            <Link
              to=""
              className="btn btn-danger px-2 mx-1"
              onClick={() => {
                if (window.confirm(`คุณจะลบสินค้า ${product.title} จริงๆหรอ`)) {
                    handleDelete(product.id);
                }
              }}
            >
              Delete
            </Link>
            <Link
              to={`/update/${product.id}`}
              className="btn btn-warning px-2 mx-1"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
