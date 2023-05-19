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
            <Row>
                <Container>
                    <h3 className="title-laporan-bulanan">Unit Entry</h3>
                </Container>
                <LineRechartComponent data={data} />
            </Row>

        </div>
    )           
}

export default TampilLaporanBulananNoAHASSAdmin;