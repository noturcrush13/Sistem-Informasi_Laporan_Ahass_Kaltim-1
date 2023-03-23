import React from "react";
import { Container } from "react-bootstrap";
import "./SubTitle.css";

function SubTitleComponent ({ title, subtitle }) {
  return (
    <>
        <div style={{paddingLeft:"1%"}}>
            <p className="title">{title}</p>
            <p className="subtitle">{subtitle}</p>
            <hr className="underline-subtitle"/>
        </div>
    </>
  );
}

export default SubTitleComponent;