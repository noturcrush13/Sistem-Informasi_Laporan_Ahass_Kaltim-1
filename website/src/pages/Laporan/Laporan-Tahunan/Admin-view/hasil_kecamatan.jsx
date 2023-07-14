import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunanKecamatan from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_admin_kecamatan";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanKecamatanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunanKecamatan />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanKecamatanAdminPage;