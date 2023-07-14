import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import { Pagination } from "react-bootstrap";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../../ranking.css";

function TampilRankingTahunanTahunAdmin(){
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';
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

    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 10; // Number of items to display per page

    const dataTahun = searchParams.get('dataTahun');

    const [laporan, setLaporan] = useState([]);

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
          <td style={{}}>
              No Dealer : {item.id_dealer}
              <br/>
              Nama Dealer : {item.namaDealer}
          </td>
          <td>
              Unit Entry : {item.unit_entry}
          </td>
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
            `https://backend-fix.glitch.me/dealer/getdealername/${idDealer}`,
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
        Axios.get(`https://backend-fix.glitch.me/laporan/rankingtahunanbytahun/${dataTahun}`, {
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

      return (
        <div >
            <SubTitleComponent title="Ranking" subtitle="Ranking Tahunan"/>
            <h3 className="text-center">Ranking Tahunan Tahun {dataTahun}</h3>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>No</th>
                        <th scope='col'>AHASS Info</th>
                        <th scope='col'>Total Unit Entry</th>
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
                            exportToCSV(laporan, `ranking_tahunan_${dataTahun}.csv`)
                        }}>Export Laporan
                    </MDBBtn>
                </Col>
            </Row>
        </div>
    )
}

export default TampilRankingTahunanTahunAdmin;  