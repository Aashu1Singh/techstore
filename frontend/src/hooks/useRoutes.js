import { useNavigate } from "react-router-dom";
const useRoutes = (route) => {
  const navigate = useNavigate();
  navigate(route);
};

export default useRoutes;
