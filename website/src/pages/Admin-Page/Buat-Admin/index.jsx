import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import BuatAdmin from "../../../components/Admin/Buat-Admin/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function BuatAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <BuatAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default BuatAdminPage;