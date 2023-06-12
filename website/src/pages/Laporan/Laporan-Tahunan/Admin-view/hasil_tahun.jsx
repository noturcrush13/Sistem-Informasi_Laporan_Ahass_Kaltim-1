import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunanTahunAdmin from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_admin_tahun";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanTahunAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunanTahunAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanTahunAdminPage;