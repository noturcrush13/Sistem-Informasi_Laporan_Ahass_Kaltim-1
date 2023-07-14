import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunanNoAHASSUser from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_user_noAhass";

import SidebarUser from "../../../../components/sidebar-user/content";

function LaporanTahunanNoAHASSUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunanNoAHASSUser />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanNoAHASSUserPage;