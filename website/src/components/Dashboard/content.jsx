import React, { useState } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
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
                <MDBTabsPane show={activeTab === 'tab1'}>Tab 1 content</MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>Tab 2 content</MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>Tab 3 content</MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab4'}>Tab 4 content</MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default DashboardContent;