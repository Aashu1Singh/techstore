import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  const { isAuthenticated } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <Component />;
};

export default Protected;
