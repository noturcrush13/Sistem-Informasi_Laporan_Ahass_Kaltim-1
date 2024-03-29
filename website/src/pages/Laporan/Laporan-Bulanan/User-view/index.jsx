import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import LaporanBulananUser from "../../../../components/Laporan/Laporan-Bulanan/user";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanBulananUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <LaporanBulananUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananUserPage;