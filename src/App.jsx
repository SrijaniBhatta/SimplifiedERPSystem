import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Products from './Pages/Products/Products';
import Orders from './Pages/Order/Orders.jsx';
import { useEffect, useState } from 'react';
import './App.css';
import About from './Pages/About/About.jsx';
import OrderCalendar from './Pages/OrderCalendar/OrderCalendar.jsx'



function App() {
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
   //sidebar open
   const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ORD001",
      customerName: "John Doe",
      orderDate: "2024-03-10",
      status: "Processing",
    },
    {
      id: 2,
      orderId: "ORD002",
      customerName: "Jane Smith",
      orderDate: "2024-02-11",
      status: "Shipped",
    },
    {
      id: 3,
      orderId: "ORD003",
      customerName: "Alice Johnson",
      orderDate: "2023-12-12",
      status: "Delivered",
    },
    {
      id: 4,
      orderId: "ORD004",
      customerName: "Robert Brown",
      orderDate: "2024-03-10",
      status: "Processing",
    },
    {
      id: 5,
      orderId: "ORD005",
      customerName: "Emily Davis",
      orderDate: "2024-03-10",
      status: "Shipped",
    },
    {
      id: 6,
      orderId: "ORD006",
      customerName: "Michael Wilson",
      orderDate: "2023-03-05",
      status: "Delivered",
    },
    {
      id: 7,
      orderId: "ORD007",
      customerName: "David Garcia",
      orderDate: "2024-03-10",
      status: "Processing",
    },
    {
      id: 8,
      orderId: "ORD008",
      customerName: "Sarah Martinez",
      orderDate: "2024-02-17",
      status: "Shipped",
    },
    {
      id: 9,
      orderId: "ORD009",
      customerName: "Jessica Hernandez",
      orderDate: "2024-02-18",
      status: "Delivered",
    },
    {
      id: 10,
      orderId: "ORD010",
      customerName: "Thomas Young",
      orderDate: "2024-02-19",
      status: "Processing",
    },
    {
      id: 11,
      orderId: "ORD011",
      customerName: "Laura Clark",
      orderDate: "2023-03-20",
      status: "Shipped",
    },
    {
      id: 12,
      orderId: "ORD012",
      customerName: "Daniel Lewis",
      orderDate: "2024-03-10",
      status: "Delivered",
    },
    {
      id: 13,
      orderId: "ORD013",
      customerName: "Olivia Walker",
      orderDate: "2024-03-19",
      status: "Processing",
    },
    {
      id: 14,
      orderId: "ORD014",
      customerName: "James Allen",
      orderDate: "2024-03-13",
      status: "Shipped",
    },
    {
      id: 15,
      orderId: "ORD015",
      customerName: "Sophia King",
      orderDate: "2024-03-24",
      status: "Delivered",
    },
    {
      id: 16,
      orderId: "ORD016",
      customerName: "Logan Hill",
      orderDate: "2024-03-24",
      status: "Processing",
    },
    {
      id: 17,
      orderId: "ORD017",
      customerName: "Ella Green",
      orderDate: "2024-03-26",
      status: "Shipped",
    },
    {
      id: 18,
      orderId: "ORD018",
      customerName: "William Adams",
      orderDate: "2024-03-27",
      status: "Delivered",
    },
    {
      id: 19,
      orderId: "ORD019",
      customerName: "Victoria Baker",
      orderDate: "2024-03-28",
      status: "Processing",
    },
    {
      id: 20,
      orderId: "ORD020",
      customerName: "Matthew Turner",
      orderDate: "2024-03-28",
      status: "Shipped",
    },
    {
      id: 21,
      orderId: "ORD021",
      customerName: "Chloe Evans",
      orderDate: "2024-02-29",
      status: "Delivered",
    },
    {
      id: 22,
      orderId: "ORD022",
      customerName: "Nathan Cooper",
      orderDate: "2024-03-31",
      status: "Processing",
    },
    {
      id: 23,
      orderId: "ORD023",
      customerName: "Emily Scott",
      orderDate: "2024-04-01",
      status: "Shipped",
    },
    {
      id: 24,
      orderId: "ORD024",
      customerName: "Michael Nelson",
      orderDate: "2024-04-02",
      status: "Delivered",
    },
    {
      id: 25,
      orderId: "ORD025",
      customerName: "Grace Rodriguez",
      orderDate: "2024-04-03",
      status: "Processing",
    },
    {
      id: 26,
      orderId: "ORD026",
      customerName: "Ethan Martinez",
      orderDate: "2024-04-04",
      status: "Shipped",
    },
    {
      id: 27,
      orderId: "ORD027",
      customerName: "Ava Turner",
      orderDate: "2024-04-05",
      status: "Delivered",
    },
    {
      id: 28,
      orderId: "ORD028",
      customerName: "Mason Wright",
      orderDate: "2024-04-06",
      status: "Processing",
    },
    {
      id: 29,
      orderId: "ORD029",
      customerName: "Madison Perez",
      orderDate: "2024-04-07",
      status: "Shipped",
    },
    {
      id: 30,
      orderId: "ORD030",
      customerName: "Henry Hall",
      orderDate: "2024-04-08",
      status: "Delivered",
    },
    {
      id: 31,
      orderId: "ORD031",
      customerName: "Mason Sharma",
      orderDate: "2024-02-06",
      status: "Processing",
    },
    // Add more data here...
  ]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      try {
        // Parse the storedUserId to check if it's valid JSON
        const parsedUserId = JSON.parse(storedUserId);
        setUserId(parsedUserId);
        
      } catch (error) {
        // Handle parsing error (e.g., invalid JSON format)
        console.error("Error parsing userId from localStorage:", error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Header userId={userId} setUserId={setUserId} open={open} setOpen={setOpen}/>
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} open={open} setOpen={setOpen} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} />
        <Route path="/about" element={<About />} />
        {userId ? (
          <>
            <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
            <Route path="/orders"  element={<Orders orders={orders} setOrders={setOrders} />} />
            <Route path="/orderscalendar" element={<OrderCalendar orders={orders} setOrders={setOrders}/>} />
          </>
        ) : (
          <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders}/>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
