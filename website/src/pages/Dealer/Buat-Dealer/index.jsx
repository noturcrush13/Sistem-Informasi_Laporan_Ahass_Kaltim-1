import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import BuatDealerAdmin from "../../../components/Dealer/Buat-Dealer/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function BuatDealerAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <BuatDealerAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default BuatDealerAdminPage;