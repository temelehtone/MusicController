import React, { Component } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const roomCode = useParams()

    return (
      <Component
        navigate={navigate}
        roomCode={roomCode}
        {...props}
        />
    );
 };

  return Wrapper;
};