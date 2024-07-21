import { useContext, createContext, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import axios from "axios";
import { API } from "../utils/Constant";
// import jwt from "jsonwebtoken";


const UserContext = createContext();

const initialState = {
  user: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signup = async (values, cb) => {
    try {
      const res = await axios.post(`${API}/users/signup`, values);
      console.log(res);
      cb();

      if (res.status === 200) {
        alert("Sign Up successfull ");
      }
    } catch (error) {
      alert("SomeThing went wrong ");
      console.log(error);
    }
  };

  const loginUser = async (value) => {
    try {
      const res = await axios.post(`${API}/users/login`, value);
      if (res.status === 401) {
        alert("Wrong Password");
      } else {
        // const jwtToken = jwt.decode(res.data.access);
        // console.log(jwtToken);
        alert(res.data.message);
      }
      console.log(res);
    } catch (error) {
      alert("Some Thing went Wrong");
    }
  };

  return (
    <UserContext.Provider
      value={{
        signup,
        loginUser,
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
