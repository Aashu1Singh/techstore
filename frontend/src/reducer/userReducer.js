export const userReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_USER_ORDERS":
      return {
        ...state,
        userOrder: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
