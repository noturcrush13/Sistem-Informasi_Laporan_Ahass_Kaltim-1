import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DashboardContent from "../../components/Dashboard/content";

import SidebarAdmin from "../../components/sidebar-admin/content";

function DashboardPage () {
    return (
        <div>
            <Row>
                <Col md={3} >
                    <SidebarAdmin />
                </Col>
                <Col md={9}>
                    <DashboardContent />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPage;