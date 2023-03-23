import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanTahunanUser from "../../../../components/Laporan/Laporan-Tahunan/user";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <LaporanTahunanUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanUserPage;