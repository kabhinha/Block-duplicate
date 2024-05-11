import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import SellerItems from "./pages/sellerItems";
import { ItemListing } from "./pages/ItemListing";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/cdashboard";


const App = () => {
  return (<div>
        <div className="bg-white">
          <Navbar/>
        </div>
         
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path="/addProduct" element={<AddProduct/>} />
            <Route path="/yourProducts" element={<SellerItems/>} />
            <Route path="/listItems"  element={<ItemListing/>} />
            <Route path='/productDetails' element={<ProductDetails/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
            <Route path='/productDetails' element={<ProductDetails/>} />
          </Routes>
        </div>
      )
};

export default App;
