import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingTahunanKecamatanAdmin from "../../../components/Ranking/Ranking-tahunan/tampil_ranking/tampil_ranking_kecamatan";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingTahunanKecamatanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingTahunanKecamatanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingTahunanKecamatanAdminPage;