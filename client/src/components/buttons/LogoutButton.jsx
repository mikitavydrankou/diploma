import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

export default LogoutButton;
