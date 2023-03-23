import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanBulananUser from "../../../../components/Laporan/Laporan-Bulanan/user";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <LaporanBulananUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananUserPage;