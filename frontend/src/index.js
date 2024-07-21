import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { UserProvider } from "./context/user_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<App />}>
//           <Route path="" element={<Home />}></Route>
//           <Route path="about" element={<About />}></Route>
//           <Route path="contact" element={<Contact />}></Route>
//           <Route path="login" element={<Login />}></Route>
//           <Route path="signup" element={<SignUp />}></Route>
//           <Route path="products" element={<Products />}></Route>
//           <Route path="/singleproduct/:id" element={<SingleProduct />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="*" element={<ErrorPage />} />
//         </Route>
//         <Route exact path="/login" element={<Login />}></Route>
//         <Route exact path="/signup" element={<SignUp />}></Route>
//       </Routes>
//     // </BrowserRouter>
//   )
// );

root.render(
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </CartProvider>
    </FilterContextProvider>
  </AppProvider>
);
