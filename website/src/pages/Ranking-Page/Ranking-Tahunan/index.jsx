import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import RankingTahunanAdmin from "../../../components/Ranking/Ranking-tahunan/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingTahunanAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <RankingTahunanAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingTahunanAdminPage;