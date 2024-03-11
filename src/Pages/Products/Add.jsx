import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert'

import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../db/db.js";


const Add = ({ products, setProducts, setIsAdding, getProducts }) => {
  const [productname, setProductname] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockquantity, setStockquantity] = useState('');
  

   //add products
  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (!productname || !category || !price || !stockquantity) {
      return swal({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
  
    const newProduct = {
      productname,
      category,
      price,
      stockquantity
    };
  
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setIsAdding(false);
      getProducts();
  
      swal({
        icon: 'success',
        title: 'Added!',
        text: `${productname} of ${category}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      swal({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add the product. Please try again later.',
        showConfirmButton: true,
      });
    }
  };
  
  return (
    <div className="small-container">
      <form>
        <h4>Add Products</h4>
        <label htmlFor="productname">Product Name</label>
        <input
          id="productname"
          type="text"
          name="productname"
          value={productname}
          autoComplete="off"
          onChange={e => setProductname(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          autoComplete="off"
          onChange={e => setCategory(e.target.value)}
        />
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          autoComplete="off"
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="stock">Stock Quantity</label>
        <input
          id="stock"
          type="number"
          name="stockquantity"
          value={stockquantity}
          autoComplete="off"
          onChange={e => setStockquantity(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <Button type='submit' variant="success" onClick={handleAdd}>Add Products</Button>
          <input
            style={{ marginLeft: '12px', background:"#000",color:"#fff",padding:"7px 10px",borderRadius:"5px" , border:"none",outline:"none"}}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;