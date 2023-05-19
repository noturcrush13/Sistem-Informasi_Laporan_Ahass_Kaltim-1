import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DaftarAdmin from "../../../components/Admin/Daftar-Admin/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function DaftarAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <DaftarAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default DaftarAdminPage;