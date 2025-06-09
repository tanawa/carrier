'use client';

import { useEffect, useState } from 'react';
import { database } from './../../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import QRCode from 'qrcode.react';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = ref(database, 'products');
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data
        ? Object.entries(data).map(([key, value], index) => ({
            id: key,
            index: index + 1,
            ...value,
          }))
        : [];
      setProducts(loaded);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">รายการสินค้าในคลัง</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow rounded-xl text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">QR Code</th>
              <th className="px-4 py-2 border">รหัสสินค้า</th>
              <th className="px-4 py-2 border">ชื่อสินค้า</th>
              <th className="px-4 py-2 border">จำนวน</th>
              <th className="px-4 py-2 border">ประเภท</th>
              <th className="px-4 py-2 border">เพิ่มเมื่อ</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  ไม่พบข้อมูลสินค้า
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="text-center border-t">
                  <td className="p-2 border">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${product.productCode}`} />
                  </td>
                  <td className="p-2 border">{product.productCode}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.quantity}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{new Date(product.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
