import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananNoAHASSUser from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_user_noAhass";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanBulananNoAHASSUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananNoAHASSUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananNoAHASSUserPage;