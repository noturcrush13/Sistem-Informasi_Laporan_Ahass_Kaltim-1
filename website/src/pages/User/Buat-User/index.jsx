import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import BuatUserAdmin from "../../../components/User-Page/Buat-User/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function BuatUserAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height: '100vh'}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <BuatUserAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default BuatUserAdminPage;