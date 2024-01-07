import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../apis/modules/user.api";
import { setUser } from "../redux/features/userSlice";

const MainLayout = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const authUser = async () => {
  //     const { response, err } = await userApi.getInfo();
  //     if (response) dispatch(setUser(response.user));
  //     if (err) dispatch(setUser(null));
  //   };
  //   authUser();
  // }, [dispatch]);
  return (
    <React.Fragment>
      {/* loading */}
      <GlobalLoading />
      {/* view  */}
      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <TopBar />
        {/* Header */}
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet/>
        </Box>
        {/* main */}
      </Box>
      {/* view  */}
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </React.Fragment>
  );
};

export default MainLayout;