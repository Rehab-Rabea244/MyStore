 import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import Cart from "./Components/Cart/Cart";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductsDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h1>404</h1>
              <p>Page Not Found</p>
            </div>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;