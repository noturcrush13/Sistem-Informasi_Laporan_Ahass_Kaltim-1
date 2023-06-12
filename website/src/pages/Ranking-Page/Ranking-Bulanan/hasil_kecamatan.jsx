import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingBulananKecamatanAdmin from "../../../components/Ranking/Ranking-bulanan/tampil_ranking/tampil_ranking_kecamatan";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingBulananKecamatanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingBulananKecamatanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingBulananKecamatanAdminPage;