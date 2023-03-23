import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import RankingBulananAdmin from "../../../components/Ranking/Ranking-bulanan/content";

import SidebarAdmin from "../../../components/sidebar-admin/content";

function RankingBulananAdminPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <RankingBulananAdmin />
                </Col>
            </Row>
        </div>
    )
}

export default RankingBulananAdminPage;