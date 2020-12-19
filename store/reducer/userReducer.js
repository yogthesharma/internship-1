const initialState = {};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_USER":
      return { username: payload.username, loginId: payload.loginId };

    case "REMOVE_USER":
      return {};

    default:
      return state;
  }
};

export default userReducer;
