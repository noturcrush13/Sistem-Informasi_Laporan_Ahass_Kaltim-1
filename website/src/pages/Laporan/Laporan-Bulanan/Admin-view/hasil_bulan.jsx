import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananBulanAdmin from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_admin_bulan";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananBulanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananBulanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananBulanAdminPage;