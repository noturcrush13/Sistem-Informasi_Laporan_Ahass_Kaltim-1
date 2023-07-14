import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananBulanSayaUser from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_user_bulansaya";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanBulananBulanSayaUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananBulanSayaUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananBulanSayaUserPage;