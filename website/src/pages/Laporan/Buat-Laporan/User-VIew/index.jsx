import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import BuatLaporanUser from "../../../../components/Laporan/Buat-Laporan/user";

import SidebarUser from "../../../../components/sidebar-user/content";

function BuatLaporanUserPage () {
    return (
        <div>
            <Row>
                <Col md={2} >
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <BuatLaporanUser />
                </Col>
            </Row>
        </div>
    )
}

export default BuatLaporanUserPage;