import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanBulananAdmin from "../../../../components/Laporan/Laporan-Bulanan/admin";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <LaporanBulananAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananAdminPage;