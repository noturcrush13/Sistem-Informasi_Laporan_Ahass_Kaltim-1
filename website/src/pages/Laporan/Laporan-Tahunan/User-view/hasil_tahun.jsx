import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunTahunSayaUser from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_user_tahunsaya";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanTahunanTahunSayaUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunTahunSayaUser/>
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanTahunSayaUserPage;