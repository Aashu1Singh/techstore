import { useContext, createContext, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import axios from "axios";
import { API } from "../utils/Constant";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const initialState = {
  user: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();

  const ChangeRoute = () => {
    navigate("");
  };

  const signup = async (values, cb) => {
    try {
      const res = await axios.post(`${API}/users/signup`, values);
      console.log(res);
      cb();

      if (res.status === 200) {
        alert("Sign Up successful");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const loginUser = async (value) => {
    try {
      const res = await axios.post(`${API}/users/login`, value);
      console.log(res);
      if (res.status === 401) {
        alert("Wrong Password");
      } else if (res.status === 200) {
        const decodedUser = jwtDecode(res.data?.accessToken);
        sessionStorage.setItem("token", res.data?.accessToken);
        sessionStorage.setItem("user", JSON.stringify(decodedUser));

        alert(res.data.message);
        ChangeRoute();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <UserContext.Provider value={{ signup, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
