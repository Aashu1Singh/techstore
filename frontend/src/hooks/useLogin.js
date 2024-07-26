const useLogin = () => {
  let isAuthenticated = false;
  let user = {};

  const token = sessionStorage.getItem("token");

  if (token) {
    isAuthenticated = true;
    user = JSON.parse(sessionStorage.getItem("user"));
  }

  return {
    isAuthenticated,
    user,
  };
};

export default useLogin;
