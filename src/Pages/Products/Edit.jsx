import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../db/db.js";

const Edit = ({ products, selectedProduct, setProducts, setIsEditing, getProducts }) => {
  const id = selectedProduct.id;

  const [productname, setProductname] = useState(selectedProduct.productname);
  const [category, setCategory] = useState(selectedProduct.category);
  const [price, setPrice] = useState(selectedProduct.price);
  const [stockquantity, setStockquantity] = useState(selectedProduct.stockquantity);

//update products
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!productname || !category || !price || !stockquantity) {
      return swal({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const product = {
      id,
      productname,
      category,
      price,
      stockquantity
    };

    await setDoc(doc(db, "products", id), {
      ...product
    });

    setProducts(products);
    setIsEditing(false);
    getProducts()

    swal({
      icon: 'success',
      title: 'Updated!',
      text: `${product.productname} of this ${product.category}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Products</h1>
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
        <Button type='submit' variant="primary">Edit Products</Button>
          <input
            style={{ marginLeft: '12px', background:"#000",color:"#fff",padding:"7px 10px",borderRadius:"5px" , border:"none",outline:"none"}}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;