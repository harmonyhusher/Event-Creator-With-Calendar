import React from "react";
import { Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks";
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from './../store/reducers/auth/action-creators';
import { useActions } from './../hooks/useActions';

const Navbar: React.FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const router = useNavigate();
  const {logout} = useActions() //custom hook
  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <div>{user.username}</div>
            <Menu.Item key={1} onClick={() => logout()}>
              Выйти
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
