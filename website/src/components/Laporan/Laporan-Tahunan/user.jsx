import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import LaporanTahunanTahunUser from "./form-user/tahun";

import LaporanTahunanTahunSayaUser from "./form-user/tahun_user";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBChart, 
    MDBCol 
  } from 'mdb-react-ui-kit';


import './laporan-tahunan.css'

function LaporanTahunanUser () {
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    }

    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Tahunan"/>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Laporan Berdasarkan Tahun
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Laporan Tahunan Saya
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'tab1'}>
                    <LaporanTahunanTahunUser />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <LaporanTahunanTahunSayaUser />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default LaporanTahunanUser;