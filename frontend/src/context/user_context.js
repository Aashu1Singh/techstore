import { useContext, createContext, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import axios from "axios";
import { API } from "../utils/Constant";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const initialState = {
  userData: {},
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();

  const signup = async (values, cb) => {
    try {
      const res = await axios.post(`${API}/users/signup`, values);
      console.log(res);
      cb();

      if (res.status === 200) {
        alert("Sign Up successful");
        navigate("login");
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
        navigate("");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const getUserData = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    let token = sessionStorage.getItem("token");
    let payload = { user_id: user.user_id };

    const res = await axios.post(`${API}/users/getUser`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(res);

    dispatch({ type: "SET_USER", payload: res.data.data });
  };

  return (
    <UserContext.Provider value={{ ...state, signup, loginUser, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
