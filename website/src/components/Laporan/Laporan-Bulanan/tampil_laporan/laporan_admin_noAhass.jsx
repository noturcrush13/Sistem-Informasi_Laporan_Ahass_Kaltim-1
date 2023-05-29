import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import Axios from "axios";

import LineRechartComponent from "../../../Graph/bar-chart";

import PieRechartComponent from "../../../Graph/pie-chart";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-bulanan.css";
import { Line } from "react-bootstrap-icons";

function TampilLaporanBulananNoAHASSAdmin(){

    const location = useLocation();
    const [params, setParams] = useState(null);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const searchParams = useQuery();

    // consolelog all params in useQuery
    // for (let param of searchParams.entries()) {
    //     console.log(param);
    // }

    const noAhass = searchParams.get('noAhass');
    const dataBulan = searchParams.get('dataBulan');
    const dataTahun = searchParams.get('dataTahun');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

    const token = localStorage.getItem("token");


    useEffect(() => {
        Axios.get(`http://localhost:3001/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            // console.log("nama dealer",response.data);
            setNamaDealer(response.data.data[0].Nama_Ahass);
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3001/laporan/getlaporanbulanan/${noAhass}/${dataBulan}/${dataTahun}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setLaporan(response.data.data);
            // console.log(response.data.data);
        })
    }, [])

    const data = laporan.reduce((result, item) => {
        const date = new Date(item.tanggal);
        const tanggal_data = date.getDate();
        const bulan_data = date.getMonth() + 1;
      
        result.push({
          name: `${tanggal_data}/${bulan_data}`,
          ue: item.unit_entry,
          date: date
        })
      
        return result;
    }, []);
      
    data.sort((a, b) => a.date - b.date);


    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Bulanan"/>
            {/* <Row>
                <Container>
                    <h3 className="title-laporan-bulanan">Unit Entry</h3>
                </Container>
                <LineRechartComponent data={data} />
            </Row> */}
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>No</th>
                        <th scope='col'>AHASS Info</th>
                        <th scope='col'>Unit Info I</th>
                        <th scope='col'>Unit Info II</th>
                        <th scope='col'>Dibuat Pada</th>
                        <th scope='col'>Opsi</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {laporan.map((item, index) => {
                        // const namaDealer = await convertIdDealerToNamaDealer(item.id_dealer);
                        // console.log(namaDealer);
                        return (
                            <tr>
                                <th scope="row">
                                    {index + 1}
                                </th>
                                <td>
                                    No Dealer : {item.id_dealer}
                                    <br/>
                                    {/* Nama Dealer : {namaDealer} */}
                                    <br/>
                                </td>
                                <td>
                                    Mekanik : {item.total_mekanik}
                                    <br/>
                                    Unit Entry : {item.unit_entry}
                                    <br/>
                                    KPB 1 : {item.KPB_1}
                                    <br/>
                                    KPB 2 : {item.KPB_2}
                                    <br/>
                                    KPB 3 : {item.KPB_3}
                                    <br/>
                                    KPB 4 : {item.KPB_4}
                                    <br/>
                                    Claim : {item.claim}
                                    <br/>
                                    Service Lengkap : {item.service_lengkap}
                                    <br/>
                                    Service Ringan : {item.service_ringan}
                                    <br/>
                                    UE by Engine Flush : {item.ue_by_engine_flush}
                                </td>
                                <td>
                                    Ganti Oli : {item.ganti_oli}    
                                    <br/>
                                    Light Repair : {item.light_repair}
                                    <br/>
                                    Heavy Repair : {item.heavy_repair}
                                    <br/>
                                    Job Return : {item.job_return}
                                    <br/>
                                    Other Job : {item.other_job}
                                    <br/>
                                    Jumlah UE By Service Visit : {item.jumlah_ue_by_service_visit}
                                    <br/>
                                    Jumlah UE By Pit Express : {item.jumlah_ue_by_pit_express}
                                    <br/>
                                    UE By Reminder : {item.ue_by_reminder}
                                    <br/>
                                    UE By AHASS Event : {item.ue_by_ahass_event}
                                    <br/>
                                    UE By Injector Cleaner : {item.ue_by_injector_cleaner}
                                </td>
                                <td>{item.tanggal}</td>
                                <td>
                                    <MDBBtn className="me-2" color='primary' size='sm'>Edit</MDBBtn>
                                    <MDBBtn color='danger' size='sm'>Hapus</MDBBtn>
                                </td>
                            </tr>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    )           
}

export default TampilLaporanBulananNoAHASSAdmin;