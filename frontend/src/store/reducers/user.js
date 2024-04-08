const initialState = {
  id: 0,
  token: "",
  email: "",
  role: 0,
  firstName: "",
  lastName: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default userReducer;
