import React from "react";
import { Container } from "react-bootstrap";
import "./SubTitle.css";

function SubTitleComponent ({ title, subtitle }) {
  return (
    <>
        <Container className="">
            <p className="title d-flex justify-content-start">{title}</p>
            <p className="subtitle">{subtitle}</p>
            <hr className="underline-subtitle"/>
        </Container>
    </>
  );
}

export default SubTitleComponent;