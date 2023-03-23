import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DaftarUserAdmin from "../../../components/User-Page/Daftar-User/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function DaftarUserAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <DaftarUserAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default DaftarUserAdminPage;