import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanTahunanUser from "../../../../components/Laporan/Laporan-Tahunan/user";

import SidebarUser from "../../../../components/sidebar-user/content";
function LaporanTahunanUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <LaporanTahunanUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanUserPage;