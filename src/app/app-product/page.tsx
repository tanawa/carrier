'use client';

import { useState } from 'react';
import { database } from './../../../lib/firebase';
import { ref, push } from 'firebase/database';

export default function AddProductPage() {
  const [productCode, setProductCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productCode || !name || !quantity || !category) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const productRef = ref(database, 'products');

    try {
      await push(productRef, {
        productCode,
        name,
        quantity: Number(quantity),
        category,
        createdAt: new Date().toISOString(),
      });

      alert('เพิ่มสินค้าเรียบร้อยแล้ว!');
      setProductCode('');
      setName('');
      setQuantity('');
      setCategory('');
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">เพิ่มข้อมูลสินค้า</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">รหัสสินค้า</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">ชื่อสินค้า</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">จำนวน</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">ประเภท</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
}
