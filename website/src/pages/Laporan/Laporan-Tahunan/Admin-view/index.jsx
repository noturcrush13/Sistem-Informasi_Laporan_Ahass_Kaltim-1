import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanTahunanAdmin from "../../../../components/Laporan/Laporan-Tahunan/admin";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <LaporanTahunanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanAdminPage;