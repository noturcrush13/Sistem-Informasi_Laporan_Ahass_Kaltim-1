import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import TampilRankingBulananBulanAdmin from "../../../components/Ranking/Ranking-bulanan/tampil_ranking/tampil_ranking_bulan";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingBulananBulanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <TampilRankingBulananBulanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingBulananBulanAdminPage;