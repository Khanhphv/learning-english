import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/slices/authSlice"; // Import các action từ authSlice

const useSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      dispatch(loginSuccess({ accessToken: token, userRole }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
};

export default useSession;