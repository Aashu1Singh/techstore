import { useContext, createContext, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import axios from "axios";
import { API } from "../utils/Constant";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./cart_context";
import {
  errorMsg,
  loadingMsg,
  successMsg,
  updateMsg,
} from "../utils/ToastFunction";

const UserContext = createContext();

const initialState = {
  userData: {},
  userOrder: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();

  const { clearCart } = useCartContext();

  const signup = async (values, cb) => {
    try {
      const res = await axios.post(`${API}/users/signup`, values);

      cb();

      if (res.status === 200) {
        successMsg("Sign Up successful");

        navigate("login");
      }
    } catch (error) {
      errorMsg("Something went wrong");
      console.log(error);
    }
  };

  const loginUser = async (value) => {
    try {
      const res = await axios.post(`${API}/users/login`, value);

      successMsg("Logged In");
      const decodedUser = jwtDecode(res.data?.accessToken);
      sessionStorage.setItem("token", res.data?.accessToken);
      sessionStorage.setItem("user", JSON.stringify(decodedUser));

      navigate("");

      console.log(res);
    } catch (error) {
      console.log(error);
      errorMsg("Something went wrong");
    }
  };

  const getUserData = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    let token = sessionStorage.getItem("token");
    let payload = { user_id: user.user_id };

    try {
      const res = await axios.post(`${API}/users/getUser`, payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(res);

      dispatch({ type: "SET_USER", payload: res.data.user });
    } catch (error) {
      errorMsg("Error is getting User Data");
      console.log(error);
    }
  };

  const checkOutFn = async (data) => {
    let token = sessionStorage.getItem("token");
    const toastId = loadingMsg("Order Processing");
    try {
      const res = await axios.post(`${API}/order`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.status === 200) {
        updateMsg("Order Placed", toastId, "success");
        navigate("/user/order");

        clearCart();
      }
    } catch (error) {
      console.log(error);
      updateMsg("Something went wrong", toastId, "error");

    }
  };

  const getOrders = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    let token = sessionStorage.getItem("token");

    try {
      const res = await axios.get(
        `${API}/order/get-all-order?userId=${user.user_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res);

      dispatch({ type: "SET_USER_ORDERS", payload: res.data.orders });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (order_id) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    let token = sessionStorage.getItem("token");

    try {
      const res = await axios.delete(
        `${API}/order?user_id=${user.user_id}&order_id=${order_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      successMsg("Order cancelled");
      // console.log(res);
      await getOrders();
    } catch (error) {
      errorMsg("Something went wrong");
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        signup,
        loginUser,
        getUserData,
        checkOutFn,
        getOrders,
        cancelOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
