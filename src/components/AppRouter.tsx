import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Event from "../pages/Event";
import Login from "../pages/Login";
import { privateRoutes, publicRoutes } from "../router";
import { useTypedSelector } from "./../hooks";
import auth from "./../store/reducers/auth/index";

const AppRouter: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={<Event />} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<Login />} key={route.path} />
      ))}
      <Route path="/" element={<Navigate to="/login"/>} />
    </Routes>
  );
};

export default AppRouter;
