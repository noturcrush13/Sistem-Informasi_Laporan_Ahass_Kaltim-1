import React from "react";
import { Nav, NavDropdown, NavbarBrand, Image } from "react-bootstrap";
import AstraLogo from "../../assets/img/Honda.png";
import LogoAHASS from "../../assets/img/LOGOAHASS_baru.png";
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
        style={{ backgroundColor: "#C71C15", height:"100%", paddingTop: "2rem" }}
      >
        <div className="sidebar-sticky"></div>
        <NavbarBrand
          href="/admin/dashboard"
          style={{ fontSize: "1.3rem", fontWeight: "600", color: "white" }}
          className="ms-3"
        >
          <Image src={AstraLogo} style={{ width: "30%",}} /> Astra Motor
        </NavbarBrand>
        <Nav.Item>
          <NavLink
            to="/admin/dashboard"
            className={active("/admin/dashboard")}
            style={{ marginLeft:"1.5rem"}}
          >
            <GridFill style={{ marginRight: "0.3rem" }} /> Dashboard
          </NavLink>
        </Nav.Item>
        <NavDropdown
           className={activeDropdown("/admin/laporan")}
           style={{ marginLeft:"1.5rem"}}
          title={
            <span className={activeDropdown("/admin/laporan")} style={{ marginLeft:"0", alignItems:"start"}}>
              <FileEarmarkFill style={{ marginRight: "0.3rem" }} /> Laporan
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1" href="/admin/laporan/buat-laporan">Buat Laporan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" href="/admin/laporan/laporan-harian">Laporan Harian</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3" href="/admin/laporan/laporan-bulanan">Laporan Bulanan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.4" href="/admin/laporan/laporan-tahunan">Laporan Tahunan</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
           className={activeDropdown("/admin/ranking")}
           style={{ marginLeft:"1rem"}}
          title={
            <span className={activeDropdown("/admin/ranking")}>
              <BarChartFill style={{ marginRight: "0.3rem" }} /> Ranking
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1" href="/admin/ranking/ranking-bulanan">Ranking Bulanan</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" href="/admin/ranking/ranking-tahunan">Ranking Tahunan</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className={activeDropdown("/admin/dealer")}
          style={{ marginLeft:"1rem"}}
          title={
            <span className={activeDropdown("/admin/dealer")}>
              <CardList style={{ marginRight: "0.3rem" }} /> Dealer
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1" href="/admin/dealer/buat-dealer">Buat Dealer</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" href="/admin/dealer/daftar-dealer">Daftar Dealer</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className={activeDropdown("/admin/user")}
          style={{ marginLeft:"1rem"}}
          title={
            <span className={activeDropdown("/admin/user")}>
              <PeopleFill style={{ marginRight: "0.3rem" }} /> User
            </span>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey="4.1" href="/admin/user/buat-user">Buat User</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" href="/admin/user/daftar-user">Daftar User</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
            className={activeDropdown("/admin/set-admin")}
            style={{ marginLeft:"1rem"}} 
            title={
            <span className={activeDropdown("/admin/set-admin")}>
              <PersonFillGear style={{marginRight:"0.3rem"}}/> Admin
              </span>} 
              id="nav-dropdown"
            >
              <NavDropdown.Item eventKey="4.1" href="/admin/set-admin/buat-admin">Buat Admin</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2"href="/admin/set-admin/daftar-admin">Daftar Admin</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/admin/login" className="sidebar-text py-3 nav-link" style={{ marginLeft:"1.5rem", marginBottom:'20%'}}>
                <BoxArrowLeft style={{marginRight:"0.3rem"}}/> Logout
              </Nav.Link>
            </Nav.Item>
            <Image src={LogoAHASS} style={{width:"80%", marginLeft:"1rem"}}/>
          </Nav>
        </>
      );
    }

    export default SidebarAdmin;
