import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import PageWrapper from "./components/PageWrapper";
import routes from "./routes/routes";
import React from "react";
import LoginPage from "./pages/LoginPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import SignupPage from "./pages/SignupPage";
import ResetPage from "./pages/ResetPage";
// import VerifyPage from "./pages/VerifyPage";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <CssBaseline/>
      {/* router app */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}/>
          {/* <Route path="/verify" element={<VerifyPage />}/> */}
          <Route path="/reset-password" element={<ResetPage />}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>

  );
};

export default App;