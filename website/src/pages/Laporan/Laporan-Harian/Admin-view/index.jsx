import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanHarianAdmin from "../../../../components/Laporan/Laporan-Harian/admin";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanHarianAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <LaporanHarianAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanHarianAdminPage;