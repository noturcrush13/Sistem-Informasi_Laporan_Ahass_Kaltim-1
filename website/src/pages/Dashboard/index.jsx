import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DashboardContent from "../../components/Dashboard/content";

import SidebarAdmin from "../../components/sidebar-admin/content";

function DashboardPage () {
    return (
        <div>
            <Row>
                <Col md={2} style={{backgroundColor:"#820000", height:"100vh"}}>
                    <SidebarAdmin />
                </Col>
                <Col md={10}>
                    <DashboardContent />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPage;