import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import BuatLaporanAdmin from "../../../../components/Laporan/Buat-Laporan/admin";

import SidebarAdmin from "../../../../components/sidebar-admin/content";

function BuatLaporanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} >
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <BuatLaporanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default BuatLaporanAdminPage;