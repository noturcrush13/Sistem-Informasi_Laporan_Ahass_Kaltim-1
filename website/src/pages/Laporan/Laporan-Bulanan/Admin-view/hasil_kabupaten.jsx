import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilLaporanBulananKabupatenAdmin from "../../../../components/Laporan/Laporan-Bulanan/tampil_laporan/laporan_admin_kabupaten";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function LaporanBulananKabupatenAdminPage(){
    return(
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilLaporanBulananKabupatenAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default LaporanBulananKabupatenAdminPage;