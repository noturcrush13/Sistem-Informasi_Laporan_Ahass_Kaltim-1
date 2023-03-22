import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import LaporanBulananNoAhassAdmin from "./form-admin/no-ahass";

import LaporanBulananBulanAdmin from "./form-admin/bulan";

import LaporanBulananKabupatenAdmin from "./form-admin/kabupaten";

import LaporanBulananKecamatanAdmin from "./form-admin/kecamatan";

import LaporanBulananBulanUser from "./form-user/bulan";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBChart, 
    MDBCol 
  } from 'mdb-react-ui-kit';


import './laporan-bulanan.css'

function LaporanBulananAdmin () {
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    }

    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Bulanan"/>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Laporan Berdasarkan No. AHASS
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Laporan Berdasarkan Bulan 
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={activeTab === 'tab3'}>
                        Laporan Berdasarkan Kabupaten
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={activeTab === 'tab4'}>
                        Laporan Berdasarkan Kecamatan
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'tab1'}>
                    <LaporanBulananNoAhassAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <LaporanBulananBulanAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>
                    <LaporanBulananKabupatenAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab4'}>
                    <LaporanBulananKecamatanAdmin />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default LaporanBulananAdmin;