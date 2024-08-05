import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
import { API } from "../utils/Constant";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  checkOut: {
    products: [],
    totalPrice: 0,
  },
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${url}/product`);
      const products = await res.data;
      // console.log(products);
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product

  const getSingleProduct = async (id) => {
    // console.log(id);
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(`${API}/product/${id}`);
      const singleProduct = await res.data;
      // console.log(singleProduct);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  const checkOutPrice = async (items) => {
    // console.log(items);
    const payload = items.map((item) => ({
      prod_id: Number(item.id),
      quantity: item.amount,
      name: item.name,
    }));

    try {
      const res = await axios.post(`${API}/product/calculate`, {
        products: payload,
      });
      console.log(res);

      if (res.status === 200) {
        console.log("ecergr");
        dispatch({
          type: "SET_CHECKOUT_INFO",
          payload: res.data,
        });
        navigate("/user/checkout");
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(res);
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct, checkOutPrice }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
