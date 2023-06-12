import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingTahunanTahunAdmin from "../../../components/Ranking/Ranking-tahunan/tampil_ranking/tampil_ranking_tahun";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingTahunanTahunAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingTahunanTahunAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingTahunanTahunAdminPage;