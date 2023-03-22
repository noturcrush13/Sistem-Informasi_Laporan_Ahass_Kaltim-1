import React from "react";
import { Nav, NavDropdown, NavbarBrand, Image } from "react-bootstrap";
import AstraLogo from "../../assets/img/Logo-Astra.png";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import {
  GridFill,
  FileEarmarkFill,
  BarChartFill,
  CardList,
  PeopleFill,
  PersonFillGear,
  BoxArrowLeft,
} from "react-bootstrap-icons";

function SidebarAdmin() {
  const location = useLocation();

  const active = (path) => {
    if (location.pathname === path) {
      return " mt-3 nav-link py-3 selected";
    } else {
      return "sidebar-text mt-3 nav-link py-3";
    }
  };

  const activeDropdown = (path) => {
    if (location.pathname.startsWith(path)) {
      return "sidebar-text py-2 selected";
    } else {
      return "sidebar-text mt-2";
    }
  };


  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block sidebar py-5"
        style={{ backgroundColor: "#820000", height:"100%", paddingTop: "2rem" }}
      >
        <div className="sidebar-sticky"></div>
        <NavbarBrand
          href="/dashboard"
          style={{ fontSize: "1.3rem", fontWeight: "600", color: "white" }}
        >
          <Image src={AstraLogo} style={{ width: "30%" }} /> Astra Motor
        </NavbarBrand>
        <Nav.Item>
          <NavLink
            to="/dashboard"
            className={active("/dashboard")}
            style={{ marginLeft:"1.5rem"}}
          >
            <GridFill style={{ marginRight: "0.3rem" }} /> Dashboard
          </NavLink>
        </Nav.Item>
        <NavDropdown
           className={activeDropdown("/laporan")}
           style={{ marginLeft:"1.5rem"}}
          title={
            <span className={activeDropdown("/laporan")} style={{ marginLeft:"0", alignItems:"start"}}>
              <FileEarmarkFill style={{ marginRight: "0.3rem" }} /> Laporan
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1" href="/laporan/buat-laporan">Buat Laporan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" href="/laporan/laporan-harian">Laporan Harian</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3" href="/laporan/laporan-bulanan">Laporan Bulanan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.4" href="/laporan/laporan-tahunan">Laporan Tahunan</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="nav-link"
          title={
            <span className="sidebar-text">
              <BarChartFill style={{ marginRight: "0.3rem" }} /> Ranking
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1">Ranking Bulanan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Ranking Tahunan</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="nav-link"
          title={
            <span className="sidebar-text">
              <CardList style={{ marginRight: "0.3rem" }} /> Dealer
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1">Buat Dealer</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Daftar Dealer</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="nav-link"
          title={
            <span className="sidebar-text">
              <PeopleFill style={{ marginRight: "0.3rem" }} /> User
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1">Buat User</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Daftar User</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="nav-link" title={<span className="sidebar-text"><PersonFillGear style={{marginRight:"0.3rem"}}/> Admin</span>} id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Buat User</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Daftar User</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/login" className="sidebar-text py-3 nav-link" style={{ marginLeft:"1.5rem", marginBottom:'100%'}}>
                <BoxArrowLeft style={{marginRight:"0.3rem"}}/> Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
      );
    }

    export default SidebarAdmin;
