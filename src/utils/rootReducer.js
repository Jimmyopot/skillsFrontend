import { combineReducers } from "redux";
import SignUpReducer from "../pages/signUp/state/SignUpSlice";
import LoginReducer from "../pages/login/state/LoginSlice";
import AdminReducer from "../pages/admin/state/AdminSlice";
import CommonReducer from "../common/state/CommonSlice";
import AuthReducer from "../pages/login/state/authSlice";

const rootReducer = combineReducers({
  SignUpReducer,
  LoginReducer,
  AdminReducer,
  CommonReducer,
  AuthReducer,
});

export default rootReducer;
