import React, { useState, useEffect } from "react";

import moment from "moment";

import Axios from "axios";

import LineRechartComponent from "../Graph/bar-chart";

import PieRechartComponent from "../Graph/pie-chart";

import LiceRechartPendapatanComponent from "../Graph/bar-chart-pendapatan";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBChart, 
    MDBCol 
  } from 'mdb-react-ui-kit';

import './dashboard.css';
import { Container } from "react-bootstrap";

function DashboardUserContent () {
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    }
    const token = localStorage.getItem("token");
    const noAhass = localStorage.getItem("id_user");

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const [laporan, setLaporan] = useState([]);
    const [namaDealer, setNamaDealer] = useState('');

    useEffect(() => {
        Axios.get(`https://backend-fix.glitch.me/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setNamaDealer(response.data.data[0].Nama_Ahass);
        })
    }, [])

    useEffect(() => {
        Axios.get(`https://backend-fix.glitch.me/laporan/getlaporanbulanandashboard/${noAhass}/${currentMonth}/${currentYear}`, {
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then((response) => {
            setLaporan(response.data.data);
        });
    }, {currentMonth, currentYear, noAhass})

    const formatDataForGraph = () => {
        return laporan.map((item) => ({
          tanggal: item.tanggal,
          ue: item.unit_entry,
        }));
    };

    const formatDataForPendapatan = () => {
        return laporan.map((item) => ({
          tanggal: item.tanggal,
          total_pendapatan: item.pendapatan_jasa + item.penjualan_part + item.penjualan_oli,
        }));
    };

    const formatDataForPendapatanPie = () => {
        return laporan.map((item) => ({
            pendapatan_jasa : item.pendapatan_jasa,
            penjualan_part : item.penjualan_part,
            penjualan_oli : item.penjualan_oli,
        }));
    };

    const pekerjaanPieData = formatDataForPendapatanPie();

    const piePekerjaan = [
        { name: 'Pendapatan Jasa', value: pekerjaanPieData.reduce((sum, item) => sum + item.pendapatan_jasa, 0) },
        { name: 'Penjualan Part', value: pekerjaanPieData.reduce((sum, item) => sum + item.penjualan_part, 0) },
        { name: 'Penjualan Oli', value: pekerjaanPieData.reduce((sum, item) => sum + item.penjualan_oli, 0) },
    ]

    const bulan = {
        1 : "Januari",
        2 : "Februari",
        3 : "Maret",
        4 : "April",
        5 : "Mei",
        6 : "Juni",
        7 : "Juli",
        8 : "Agustus",
        9 : "September",
        10 : "Oktober",
        11 : "November",
        12 : "Desember",
    }

    const convert = (month) => {
        return bulan[month];
    }

    const formatDataForPekerjaan = () => {
        return laporan.map((item) => ({
          KPB_1: item.KPB_1,
          KPB_2: item.KPB_2,
          KPB_3: item.KPB_3,
          KPB_4: item.KPB_4,
          claim: item.claim,
          service_lengkap: item.service_lengkap,
          service_ringan: item.service_ringan,
          ganti_oli: item.ganti_oli,
          light_repair: item.light_repair,
          heavy_repair: item.heavy_repair,
          job_return: item.job_return,
          jumlah_ue_by_service_visit: item.jumlah_ue_by_service_visit,
          jumlah_ue_by_pit_express: item.jumlah_ue_by_pit_express,
          ue_by_reminder: item.ue_by_reminder,
          ue_by_ahass_event: item.ue_by_ahass_event,
          ue_by_engine_flush: item.ue_by_engine_flush,
          ue_by_injector_cleaner: item.ue_by_injector_cleaner,
        }));
    };
    // console.log(data)
    // console.log(pekerjaanData);

    const pekerjaanData = formatDataForPekerjaan();

    const pieData = [
        { name: 'KPB 1', value: pekerjaanData.reduce((sum, item) => sum + item.KPB_1, 0) },
        { name: 'KPB 2', value: pekerjaanData.reduce((sum, item) => sum + item.KPB_2, 0) },
        { name: 'KPB 3', value: pekerjaanData.reduce((sum, item) => sum + item.KPB_3, 0) },
        { name: 'KPB 4', value: pekerjaanData.reduce((sum, item) => sum + item.KPB_4, 0) },
        { name: 'Claim', value: pekerjaanData.reduce((sum, item) => sum + item.claim, 0) },
        { name: 'Service Lengkap', value: pekerjaanData.reduce((sum, item) => sum + item.service_lengkap, 0) },
        { name: 'Service Ringan', value: pekerjaanData.reduce((sum, item) => sum + item.service_ringan, 0) },
        { name: 'Ganti Oli', value: pekerjaanData.reduce((sum, item) => sum + item.ganti_oli, 0) },
        { name: 'Light Repair', value: pekerjaanData.reduce((sum, item) => sum + item.light_repair, 0) },
        { name: 'Heavy Repair', value: pekerjaanData.reduce((sum, item) => sum + item.heavy_repair, 0) },
        { name: 'Job Return', value: pekerjaanData.reduce((sum, item) => sum + item.job_return, 0) },
        { name: 'Jumlah UE by Service Visit', value: pekerjaanData.reduce((sum, item) => sum + item.jumlah_ue_by_service_visit, 0) },
        { name: 'Jumlah UE by Pit Express', value: pekerjaanData.reduce((sum, item) => sum + item.jumlah_ue_by_pit_express, 0) },
        { name: 'UE by Reminder', value: pekerjaanData.reduce((sum, item) => sum + item.ue_by_reminder, 0) },
        { name: 'UE by AHASS Event', value: pekerjaanData.reduce((sum, item) => sum + item.ue_by_ahass_event, 0) },
        { name: 'UE by Engine Flush', value: pekerjaanData.reduce((sum, item) => sum + item.ue_by_engine_flush, 0) },
        { name: 'UE by Injector Cleaner', value: pekerjaanData.reduce((sum, item) => sum + item.ue_by_injector_cleaner, 0) },
    ];

      

    

    return (
        <div >
            <p className="dashboard-title" style={{paddingLeft:"1%"}}>Dashboard</p>
            <p className="subtitle ms-3"> {namaDealer} - No Ahass : {noAhass}</p>
            <hr className="underline-subtitle ms-3"/>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Unit Entry
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink 
                    onClick={() => handleBasicClick('tab2')} 
                    active={activeTab === 'tab2'}
                    >
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
                    <Container className="d-flex justify-content-center">
                        <h3>Bar Chart Unit Entry Bulan {convert(currentMonth)}</h3>
                    </Container>
                    <LineRechartComponent data={formatDataForGraph()} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Pie Chart Bulan {convert(currentMonth)}</h3>
                    </Container>
                    <PieRechartComponent data={pieData} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Bar Chart Pendapatan Bulan {convert(currentMonth)}</h3>
                    </Container>
                    <LiceRechartPendapatanComponent data={formatDataForPendapatan()} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab4'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Pie Chart Pendapatan Bulan {convert(currentMonth)}</h3>
                    </Container>
                    <PieRechartComponent data={piePekerjaan} />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default DashboardUserContent;