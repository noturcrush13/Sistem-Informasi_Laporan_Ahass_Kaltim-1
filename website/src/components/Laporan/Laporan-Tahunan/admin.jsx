import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import LaporanTahunanNoAhassAdmin from "./form-admin/no-ahass";

import LaporanTahunanTahunAdmin from "./form-admin/tahun";

import LaporanTahunanKabupatenAdmin from "./form-admin/kabupaten";

import LaporanTahunanKecamatanAdmin from "./form-admin/kecamatan";

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

function LaporanTahunanAdmin () {
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
                        Laporan Berdasarkan No. AHASS
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Laporan Berdasarkan Tahun 
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
                    <LaporanTahunanNoAhassAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <LaporanTahunanTahunAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>
                    <LaporanTahunanKabupatenAdmin />
                </MDBTabsPane> 
                <MDBTabsPane show={activeTab === 'tab4'}>
                    <LaporanTahunanKecamatanAdmin />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default LaporanTahunanAdmin;