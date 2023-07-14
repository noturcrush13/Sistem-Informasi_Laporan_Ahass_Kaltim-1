import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanHarianAdmin from "../../../../components/Laporan/Laporan-Harian/tampil_laporan/laporan_admin";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanHarianHasilAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanHarianAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanHarianHasilAdminPage;