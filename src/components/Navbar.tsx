import React from "react";
import { Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks";

const Navbar: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const router = useNavigate();
  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <div>User</div>
            <Menu.Item key={1} onClick={() => alert("Вышел")}>
              {" "}
              Выйти{" "}
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key={1} onClick={() => router(RouteNames.LOGIN)}>
              <div>Логин</div>
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
