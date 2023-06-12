import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import { Pagination } from "react-bootstrap";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-bulanan.css";

function TampilLaporanBulananKabupatenAdmin(){

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const searchParams = useQuery();

    const dataBulan = searchParams.get('dataBulan');
    const dataTahun = searchParams.get('dataTahun');
    const dataKabupaten = searchParams.get('dataKabupaten');

    const [laporan, setLaporan] = useState([]);

    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 3; // Number of items to display per page

    const token = localStorage.getItem("token");

    const handlePageChange = (number) => {
        setPage(number);
        setActive(number);
    };

    const handleNext = () => {
        if (page < Math.ceil(laporan.length / itemsPerPage)) {
        setPage(page + 1);
        setActive(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
        setPage(page - 1);
        setActive(page - 1);
        }
    };

    const renderPaginationItems = () => {
      const items = [];

      for (let number = 1; number <= Math.ceil(laporan.length / itemsPerPage); number++) {
      items.push(
          <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
          {number}
          </Pagination.Item>
      );
      }

      return items;
    };

    const renderTableRows = () => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const slicedData = laporan.slice(start, end);

      return slicedData.map((item, index) => (
          <tr>
              <th scope='row'>{start + index + 1}</th>
                  <td>
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
                  <td>{item.tanggal}</td>
              </tr>
      ));
  }

  const exportToCSV = (csvData, fileName) => {
      // const filteredData = csvData.map(({ _id, penjualan_part, pendapatan_jasa, penjualan_oli,__v,  ...rest }) => rest);
      const filteredData = csvData.map(({ _id, __v,  ...rest }) => rest);
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: filetype});
      FileSaver.saveAs(data, fileName + fileextension);
  }

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
        Axios.get(`http://localhost:3001/laporan/getrekaplaporanbulanankabupaten/${dataBulan}/${dataTahun}/${dataKabupaten}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then((response) => {
            const dataLaporan = response.data.data;
            const updatedLaporan = dataLaporan.map(async (laporan) => {
                const namaDealer = await convertIdDealerToNamaDealer(laporan.id_dealer);
                return {
                    ...laporan,
                    namaDealer: namaDealer,
                };
            });

            Promise.all(updatedLaporan)
            .then((updatedLaporanWithDealerName) => {
                setLaporan(updatedLaporanWithDealerName);
            }).catch((error) => {
                console.error('Failed to update laporan with dealer name', error);
            });
        }).catch((error) => {
            console.error('Failed to fetch laporan data', error);
        });
    }, []);


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
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {renderTableRows()}
                </MDBTableBody>
            </MDBTable>
            <Row className="d-flex justify-content-start">
                <Col md={12} className="d-flex justify-content-start">
                    <Pagination>
                        <Pagination.Item disabled={page === 1} onClick={handlePrev}>
                            Prev
                        </Pagination.Item>
                        {renderPaginationItems()}
                        <Pagination.Item disabled={page === Math.ceil(laporan.length / itemsPerPage)} onClick={handleNext}>
                            Next
                        </Pagination.Item>
                    </Pagination>
                    <MDBBtn 
                        className="ms-2"
                        color='success' 
                        size='sm'
                        style={{height: '2.2rem', lineHeight: '1.5rem'}}
                        onClick={(e) => {
                            exportToCSV(laporan, `laporan_bulanan_${dataKabupaten}.csv`)
                        }}>Export Laporan
                    </MDBBtn>
                </Col>
            </Row>
        </div>
    )
}

export default TampilLaporanBulananKabupatenAdmin;