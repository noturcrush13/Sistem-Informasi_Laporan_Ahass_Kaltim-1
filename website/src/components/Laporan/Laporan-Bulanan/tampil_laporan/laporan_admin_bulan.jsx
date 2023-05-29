import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import Axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-bulanan.css";


function TampilLaporanBulananBulanAdmin(){

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const searchParams = useQuery();

    // consolelog all params in useQuery
    // for (let param of searchParams.entries()) {
    //     console.log(param);
    // }

    // const [namaDealer, setNamaDealer] = useState([])
    const dataBulan = searchParams.get('dataBulan');
    const dataTahun = searchParams.get('dataTahun');
    
    const [dealer, setDealer] = useState([])
    
    const [laporan, setLaporan] = useState([]);

    const [laporanFinal, setLaporanFinal] = useState([])

    const token = localStorage.getItem("token");

    const convertIdDealerToNamaDealer = async (idDealer) => {
        try {
          const response = await Axios.get(
            `http://localhost:3001/dealer/getdealername/${idDealer}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data.data[0].Nama_Ahass;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to convert ID dealer to dealer name.');
        }
    };
    

    useEffect(() => {
        Axios.get(`http://localhost:3001/laporan/getrekaplaporanbulanan/${dataBulan}/${dataTahun}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
          .then((response) => {
            const laporanData = response.data.data;
            const updatedLaporan = laporanData.map(async (item) => {
              const namaDealer = await convertIdDealerToNamaDealer(item.id_dealer);
              return {
                ...item,
                namaDealer: namaDealer,
              };
            });
      
            Promise.all(updatedLaporan)
              .then((updatedLaporanWithDealerName) => {
                setLaporan(updatedLaporanWithDealerName);
              })
              .catch((error) => {
                console.error('Failed to update laporan with dealer name', error);
              });
          })
          .catch((error) => {
            console.error('Failed to fetch laporan data', error);
          });
      }, []);
      

    

    console.log("ini awal", laporan);
    // console.log("ini laporan", dealer);
    // setLaporanFinal(totalDataDalamSebulan);


    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Bulanan"/>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>No</th>
                        <th scope='col'>AHASS Info</th>
                        <th scope='col'>Unit Info I</th>
                        <th scope='col'>Unit Info II</th>
                        <th scope='col'>Opsi</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {laporan.map((item, index) => {
                        return (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td style={{}}>
                                    No Dealer : {item.id_dealer}
                                    <br/>
                                    Nama Dealer : {item.namaDealer}
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
                                <td class>
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

export default TampilLaporanBulananBulanAdmin;