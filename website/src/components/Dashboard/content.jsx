import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import { Bar } from 'react-chartjs-2';

import { CDBContainer } from 'cdbreact';

import LineRechartComponent from "../Graph/bar-chart";

import PieRechartComponent from "../Graph/pie-chart";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBChart, 
    MDBCol 
  } from 'mdb-react-ui-kit';

import './dashboard.css'

function DashboardContent () {
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    }

    const data = [
        { name: "Jan", pv: 2400 },
        { name: "Feb", pv: 1398 },
        { name: "Mar", pv: 9800 },
        { name: "Apr", pv: 3908 },
        { name: "May", pv: 4800 },
        { name: "Jun", pv: 3800 },
        { name: "Jul", pv: 4300 },
    ];

    const pieData = [
        {
            "name": "Chrome",
            "value": 68.85
        },
        {
            "name": "Firefox",
            "value": 7.91
        },
        {
            "name": "Edge",
            "value": 6.85
        },
        {
            "name": "Internet Explorer",
            "value": 6.14
        },
        {
            "name": "Others",
            "value": 10.25
        }
    ];

    

    return (
        <div >
            <Container>
                <p className="dashboard-title">Dashboard</p>
            </Container>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Unit Entry
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Pekerjaan 
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={activeTab === 'tab3'}>
                        Pendapatan(BAR)
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={activeTab === 'tab4'}>
                        Pendapatan(PIE)
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'tab1'}>
                    <LineRechartComponent data={data} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>Tab 2 content</MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>Tab 3 content</MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab4'}>
                    <PieRechartComponent data={pieData} />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default DashboardContent;