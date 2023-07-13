import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Share/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
