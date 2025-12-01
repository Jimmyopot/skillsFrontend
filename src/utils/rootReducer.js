import { combineReducers } from "redux";
import SignUpReducer from "../pages/signUp/state/SignUpSlice";
import LoginReducer from "../pages/login/state/LoginSlice";
import AdminReducer from "../pages/admin/state/AdminSlice";
import CommonReducer from "../common/state/CommonSlice";
import AuthReducer from "../pages/login/state/authSlice";
import AdminLoginReducer from "../pages/adminLogin/state/AdminLoginSlice";

const rootReducer = combineReducers({
  SignUpReducer,
  LoginReducer,
  AdminReducer,
  CommonReducer,
  AuthReducer,
  AdminLoginReducer,
});

export default rootReducer;
