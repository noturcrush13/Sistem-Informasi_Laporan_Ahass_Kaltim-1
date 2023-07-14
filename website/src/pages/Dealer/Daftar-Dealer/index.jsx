import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DaftarDealerAdmin from "../../../components/Dealer/Daftar-Dealer/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function DaftarDealerAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <DaftarDealerAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default DaftarDealerAdminPage;