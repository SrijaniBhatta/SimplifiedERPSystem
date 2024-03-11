import React, { useEffect, useRef, useState } from "react";
import "./Orders.css";
import Button from "react-bootstrap/Button";
import ModalPage from "./ModalPage";
import Swal from 'sweetalert2';



const Orders = ({ orders , setOrders }) => {

  //modal open
  const [show, setShow] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [editingStatusId, setEditingStatusId] = useState(null);
  const inputRef = useRef(null);


  const handleClose = () => setShow(false);
 


  //view order by  specific id 
  const handleViewDetails = (orderId) => {
    const order = orders.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    setShow(true);
  };

//update orders
  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    setEditingStatusId(null); // Reset the editing status ID
  };
  


  const handleStartEditingStatus = (orderId, currentStatus) => {
    setEditingStatusId(orderId);
    setNewStatus(currentStatus);
  };


  //delete orders
  const handleDeleteOrder = (orderId) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor:"#3085d6" ,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      const updatedOrders = orders.filter((order) => order.orderId !== orderId);
      if (result.isConfirmed) {
        setOrders(updatedOrders);
        setSelectedOrder(null);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   
  };

  useEffect(() => {
    if (editingStatusId !== null) {
      inputRef.current.focus();
    }
  }, [editingStatusId]);
  



  return (
    <div className="orders-container mt-5 container">
      <h4>Orders List<span style={{fontSize:"10px"}}>(values get from dummy data)</span></h4>
      <div className="contain-table">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>  {editingStatusId === order.orderId ? (
                  <input
                    ref={inputRef}
                    type="text"
                    style={{
                      border:"2px solid grey",
                      cursor:""
                    }}
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    onBlur={() => handleUpdateStatus(order.orderId, newStatus)}
                  />
                ) : (
                  order.status
                )}
                </td>
              <td className="px-3">
                <Button
                  className="mx-2 mb-2"
                  variant="success"
                  onClick={() => handleViewDetails(order.orderId)}
                >
                  View Details
                </Button>
                <Button
                style={{whiteSpace:"nowrap"}}
                  className="mx-2 mb-2"
                  variant="warning"
                  onClick={() => handleStartEditingStatus(order.orderId, order.status)}
                >
                  Update Status
                </Button>
                <Button
                  className="mx-2 mb-2"
                  variant="danger"
                  onClick={() => handleDeleteOrder(order.orderId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <ModalPage show={show} selectedOrder={selectedOrder} handleClose={handleClose}/>

    

      
    </div>
  );
};

export default Orders;
