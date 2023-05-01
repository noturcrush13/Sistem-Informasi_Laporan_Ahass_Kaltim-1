import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import DashboardContent from "../../../components/Dashboard/content";

import SidebarUser from "../../../components/sidebar-user/content";

function DashboardPageUser() {
    return (
        <div>
            <Row>
                <Col md={2} style={{height:"100vh"}}>
                    <SidebarUser />
                </Col>
                <Col md={10}>
                    <DashboardContent />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPageUser;