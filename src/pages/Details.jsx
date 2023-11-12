import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import './Details.css'; // ปรับเส้นทางไปยังที่ตั้งของไฟล์ CSS
import Loading from "../components/Loading";
import * as loadingData from "../loading/rainbow.json"
import Swal from 'sweetalert2'

const Details = () => {
  const [product, setProduct] = useState(null); // ตั้งค่าเริ่มต้นเป็น null
  const { productId } = useParams();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data); // ตั้งค่าผลิตภัณฑ์ด้วยข้อมูลที่ได้รับ
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    setLoading(true);
    fetchProduct();
  }, [productId]);

  // ตรวจสอบว่า product มีค่าหรือยัง ถ้าไม่มีค่าให้แสดง "...loadingData"
  if (!product) {
    return <Loading animation={{ ...loadingData }} />
  }


  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'ขออภัยพอดีของหมดแล้ว',
      text: 'ขออภัยพอดีของหมดแล้ว ไว้โอกาสหน้ามาใช้บริการเราใหม่นะ',
    });
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img src={product.imagePath} alt={product.title} className="product-image" />
      </div>
      <div className="product-details-container">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-price">
          <span className="original-price">{product.price}</span>
          <span className="sale-price">{product.price}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={showAlert}>Add to cart</button>
          <button className="btn btn-secondary" onClick={showAlert}>Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
