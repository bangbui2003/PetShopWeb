import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/modules/auth.api";
import { setUser } from "../redux/features/userSlice";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await authApi.getInfo();
      if (response) dispatch(setUser(response));
      if (err) {
        dispatch(setUser(null));
        navigate("/login");
      }
    };
    authUser();
  }, [dispatch, navigate]);

  return (
    <>
      {
        user && children
      }
    </>
  );
};

export default ProtectedPage;