import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/client/Home";
import Cart from "./pages/client/Cart";
import Navbar from "./components/client/Navbar";
import Footer from "./components/client/Footer";
import Dashboard from "./pages/admin/Dahboard";
import Users from "./pages/admin/Users";
import ProductsList from "./pages/admin/ProductsList";
import CreateProduct from "./pages/admin/CreateProduct";
import CategoriesList from "./pages/admin/CategoriesList";
import EditCategories from "./pages/admin/EditCategories";
import CreateCategory from "./pages/admin/CreateCategory";
import AdminLogin from "./components/admin/AdminLogin";
import PrivateRoute from "./pages/admin/PrivateRoute";




const App = () => {
    return (
        <Router>
        <ConditionalNavbar/>
            <Routes>
                {/*client routes */}
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                {/*admin routes */}
                {/* <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route path="/admin/products/list" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
                <Route path="/admin/products/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
                <Route path="/admin/categories/list" element={<PrivateRoute><CategoriesList /></PrivateRoute>} />
                <Route path="/admin/categories/edit" element={<PrivateRoute><EditCategories /></PrivateRoute>} />
                <Route path="/admin/categories/create" element={<PrivateRoute><CreateCategory /></PrivateRoute>} />
                */}

                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<Dashboard />}/>
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/products/list" element={<ProductsList /> }/>
                <Route path="/admin/products/create" element={<CreateProduct />} />
                <Route path="/admin/categories/list" element={<CategoriesList />} />
                <Route path="/admin/categories/edit" element={<EditCategories />} />
                <Route path="/admin/categories/create" element={<CreateCategory />} />
               
                
                
               

            </Routes>
            <ConditionalFooter/>
           
        </Router>
    );
};
const ConditionalNavbar =()=>{
    const location=useLocation();
    if(location.pathname.includes("/admin")){
        return null;
    }
    return <Navbar/>
}
const ConditionalFooter =()=>{
    const location=useLocation();
    if(location.pathname.includes("/admin")){
        return null;
    }
    return  <Footer/>
}



export default App;
