import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanHarianUser from "../../../../components/Laporan/Laporan-Harian/user";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanHarianUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <LaporanHarianUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanHarianUserPage;