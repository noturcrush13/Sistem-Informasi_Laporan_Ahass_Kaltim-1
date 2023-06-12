import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingBulananKabupatenAdmin from "../../../components/Ranking/Ranking-bulanan/tampil_ranking/tampil_ranking_kabupaten";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingBulananKabupatenAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingBulananKabupatenAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingBulananKabupatenAdminPage;