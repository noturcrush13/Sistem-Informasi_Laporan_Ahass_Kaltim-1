import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import Axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-harian.css";

function TampilLaporanHarianAdmin(){

    const location = useLocation();
    const [params, setParams] = useState(null);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const searchParams = useQuery();
    const noAhass = searchParams.get('noAhass');
    const tanggalAwal = searchParams.get('tanggalAwal');
    const tanggalAkhir = searchParams.get('tanggalAkhir');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

    const token = localStorage.getItem("token");

    console.log(searchParams.get('noAhass'))
    console.log('noAhass:', noAhass);
    console.log('tanggalAwal:', tanggalAwal);
    console.log('tanggalAkhir:', tanggalAkhir);

    useEffect(() => {
        Axios.get(`http://localhost:3001/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.data);
            setNamaDealer(response.data.data[0].Nama_Ahass);
        })
    }, [])


    useEffect(() => {
        Axios.get(`http://localhost:3001/laporan/getlaporanharian/${noAhass}/${tanggalAwal}/${tanggalAkhir}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setLaporan(response.data.data);
            console.log(response.data.data);
        })
    }, [])



    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
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
                        return (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>
                                    No Dealer : {item.id_dealer}
                                    <br/>
                                    Nama Dealer : {namaDealer}
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

export default TampilLaporanHarianAdmin;