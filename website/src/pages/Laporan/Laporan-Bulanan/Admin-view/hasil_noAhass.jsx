import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananNoAHASSAdmin from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_admin_noAhass";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananNoAHASSAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananNoAHASSAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananNoAHASSAdminPage;