import React, { useState, useEffect, useMemo } from "react";

import Axios from "axios";

import { Pagination } from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import '../dealer.css'

function DaftarDealerAdmin () {

    const [dealer, setDealer] = useState([]);

    const token = localStorage.getItem("token");

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const getDealer = () => {
        Axios.get("http://localhost:3001/dealer/",{
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setDealer(response.data['data']);
            console.log(dealer);
        })
    }
    
    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 5; // Number of items to display per page

    const handlePageChange = (number) => {
        setPage(number);
        setActive(number);
    };

    const handleNext = () => {
        if (page < Math.ceil(dealer.length / itemsPerPage)) {
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

        for (let number = 1; number <= Math.ceil(dealer.length / itemsPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
            {number}
            </Pagination.Item>
        );
        }

        return items;
    };

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: filetype});
        FileSaver.saveAs(data, fileName + fileextension);
    }

    const renderTableRows = () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedData = dealer.slice(start, end);
    
        return slicedData.map((item, index) => (
          <tr key={index}>
            <th scope='row'>{start + index + 1}</th>
            <td>{item.No_Ahass}</td>
            <td>{item.Nama_Ahass}</td>
            <td>
              Alamat : {item.Alamat}
              <br />
              Telepon : {item.Telepon}
              <br />
              Kabupaten : {item.Kabupaten}
              <br />
              Kecamatan : {item.Kecamatan}
            </td>
            <td>{item.createdAt}</td>
            <td>
              <MDBBtn className="me-2" color='primary' size='sm'>Edit</MDBBtn>
              <MDBBtn color='danger' size='sm'>Hapus</MDBBtn>
            </td>
          </tr>
        ));
    };

    return (
        getDealer(),
        <div>
            <SubTitleComponent title="Dealer" subtitle="Daftar Dealer"/>
                
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>No AHASS</th>
                            <th scope='col'>Nama AHASS</th>
                            <th scope='col'>Dealer Info</th>
                            <th scope='col'>Dibuat Pada</th>
                            <th scope='col'>Opsi</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {renderTableRows()}
                    </MDBTableBody>
                </MDBTable>
                <Pagination>
                    <Pagination.Item disabled={page === 1} onClick={handlePrev}>
                        Prev
                    </Pagination.Item>
                    {renderPaginationItems()}
                    <Pagination.Item disabled={page === Math.ceil(dealer.length / itemsPerPage)} onClick={handleNext}>
                        Next
                    </Pagination.Item>
                </Pagination>
            <MDBBtn 
            color='success' 
            size='sm'
            onClick={(e) => {
                exportToCSV(dealer, 'Daftar Dealer');
            }}>Export Dealer</MDBBtn>
        </div>
    )
}

export default DaftarDealerAdmin;