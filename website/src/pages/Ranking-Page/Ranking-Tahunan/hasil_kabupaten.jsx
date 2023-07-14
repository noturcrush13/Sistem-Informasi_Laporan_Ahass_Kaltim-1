import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingTahunanKabupatenAdmin from "../../../components/Ranking/Ranking-tahunan/tampil_ranking/tampil_ranking_kabupaten";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingTahunanKabupatenAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingTahunanKabupatenAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingTahunanKabupatenAdminPage;