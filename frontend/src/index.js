import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import Products from "./Products";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import Protected from "./Protected";
import Profile from "./components/Profile";
import CheckOut from "./components/CheckOut";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<Cart />} />
                <Route path="user">
                  <Route
                    path="profile"
                    element={<Protected Component={Profile} />}
                  />
                  <Route
                    path="CheckOut"
                    element={<Protected Component={CheckOut} />}
                  />
                </Route>

                <Route path="singleproduct/:id" element={<SingleProduct />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </UserProvider>
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </BrowserRouter>
);
