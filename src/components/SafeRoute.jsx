import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "../store/reducers/authReducer";
const SafeRoute = () => {
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!user && storedToken) {
      dispatch(setCredentials({ token: storedToken }));
    } else if (!user && !storedToken) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, dispatch]);
  return <Outlet />;
};
export default SafeRoute;
