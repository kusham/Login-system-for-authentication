import { SIGN_IN, SIGN_UP } from "../Action/Constant/ActionType";


const authReducer = (state =null, action) => {
    switch (action.type) {
      case SIGN_UP:
        return { ...state, user : action?.payload };
      case SIGN_IN:
        return { ...state, user : action?.payload.user };
  
      default:
        return state;
    }
  };
  
  export default authReducer;