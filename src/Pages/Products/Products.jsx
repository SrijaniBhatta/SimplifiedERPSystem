import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/db.js";
import Swal from 'sweetalert2';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import UserHeader from "./UserHeader.jsx";


const Products = ({products,setProducts}) => {
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



  //get products from firestore database
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);


  //edit products
  const handleEdit = (id) => {
    const [product] = products.filter((product) => product.id === id);

    setSelectedProduct(product);
    setIsEditing(true);
  };
  


  //delete products
  const handleDelete = async (id) => {
    const [productToDelete] = products.filter((product) => product.id === id);
    
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "red",
      cancelButtonText: "No, cancel!",
    });
  
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "products", id));
        
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${productToDelete.productname} ${productToDelete.category}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
  
        const productsCopy = products.filter((product) => product.id !== id);
        setProducts(productsCopy);
      } catch (error) {
        console.error("Error deleting document: ", error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: `${productToDelete.productname} ${productToDelete.category}'s data could not be deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  

  return (
    <div className="container" style={{marginTop:"70px"}}>
      {!isAdding && !isEditing && (
        <>
        <UserHeader
        setIsAdding={setIsAdding}/>
          <Table
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          products={products}
          setProducts={setProducts}
          setIsAdding={setIsAdding}
          getProducts={getProducts}
        />
      )}
      {isEditing && (
        <Edit
          products={products}
          selectedProduct={selectedProduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
          getProducts={getProducts}
        />
      )}
    </div>
  );
};

export default Products;
