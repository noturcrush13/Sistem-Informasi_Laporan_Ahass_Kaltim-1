import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanTahunanKabupatenAdmin from "../../../../components/Laporan/Laporan-Tahunan/tampil_laporan/laporan_admin_kabupaten";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanTahunanKabupatenAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanTahunanKabupatenAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanTahunanKabupatenAdminPage;