import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams(); // รับ id จาก URL parameter

  // สมมติว่าคุณมีฟังก์ชั่นหรือวิธีในการดึงข้อมูลสินค้าด้วย id
  // const product = getProductDetails(id);

  // โค้ดที่จะแสดงรายละเอียดของสินค้า

  return (
    <div className="details-container">
      <h1 className="product-title">รายละเอียดสินค้า</h1>
      <div className="product-detail">
        <p className="detail"><strong>โมเดล:</strong> {product.title}</p>
        <p className="detail"><strong>รหัสผู้จำหน่าย:</strong> {product.category}</p>
        <p className="detail"><strong>คำอธิบาย:</strong> {product.description}</p>
        <p className="detail"><strong>ราคา:</strong> {product.price}</p>
      </div>
    </div>
  );
};

export default Details;
