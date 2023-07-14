import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananKecamatanAdmin from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_admin_kecamatan";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananKecamatanAdminPage(){
    return(
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananKecamatanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananKecamatanAdminPage;