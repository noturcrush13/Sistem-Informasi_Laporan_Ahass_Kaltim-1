import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import RankingTahunanTahunAdmin from "./form/tahun";

import RankingTahunanKabupatenAdmin from "./form/kabupaten";

import RankingTahunanKecamatanAdmin from "./form/kecamatan";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBChart, 
    MDBCol 
  } from 'mdb-react-ui-kit';


function RankingTahunanAdmin () {
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    }

    return (
        <div >
            <SubTitleComponent title="Ranking" subtitle="Ranking Tahunan"/>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Ranking Berdasarkan Tahun
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Ranking Berdasarkan Kabupaten
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={activeTab === 'tab3'}>
                        Ranking Berdasarkan Kecamatan
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'tab1'}>
                    <RankingTahunanTahunAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <RankingTahunanKabupatenAdmin />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>
                    <RankingTahunanKecamatanAdmin />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default RankingTahunanAdmin;