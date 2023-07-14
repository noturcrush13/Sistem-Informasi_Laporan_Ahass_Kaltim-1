import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunanNoAHASSAdmin from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_admin_noAhass";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanNoAHASSAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunanNoAHASSAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanNoAHASSAdminPage;