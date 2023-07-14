import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanHarianUser from "../../../../components/Laporan/Laporan-Harian/tampil_laporan/laporan_user";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanHarianHasilUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <TampilLaporanHarianUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanHarianHasilUserPage;