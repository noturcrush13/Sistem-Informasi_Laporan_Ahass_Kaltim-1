import React, { useState, useEffect, useMemo } from "react";

import Axios from "axios";

import { Pagination } from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import { 
    MDBBadge, 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,} from 'mdb-react-ui-kit';

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button, Modal} from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import '../dealer.css'

function DaftarDealerAdmin () {
    const kabupaten = [
        {
            "no_kabupaten": "1",
            "nama_kabupaten": "Balikpapan",
            "kecamatan": [
                {
                    "no_kecamatan": "1",
                    "nama_kecamatan": "Balikpapan Tengah"
                },
                {
                    "no_kecamatan": "2",
                    "nama_kecamatan": "Balikpapan Kota"
                },
                {
                    "no_kecamatan": "3",
                    "nama_kecamatan": "Balikpapan Barat"
                },
                {
                    "no_kecamatan": "4",
                    "nama_kecamatan": "Balikpapan Timur"
                },
                {
                    "no_kecamatan": "5",
                    "nama_kecamatan": "Balikpapan Selatan"
                },
                {
                    "no_kecamatan": "6",
                    "nama_kecamatan": "Balikpapan Utara"
                }
            ]
        },
        {
            "no_kabupaten": "2",
            "nama_kabupaten": "Penajam Paser Utara",
            "kecamatan": [
                {
                    "no_kecamatan": "7",
                    "nama_kecamatan": "Penajam"
                },
                {
                    "no_kecamatan": "8",
                    "nama_kecamatan": "Sepaku"
                },
            ]
        },
        {
            "no_kabupaten": "3",
            "nama_kabupaten": "Paser",
            "kecamatan": [
                {
                    "no_kecamatan": "9",
                    "nama_kecamatan": "Tanah Grogot"
                },
                {
                    "no_kecamatan": "10",
                    "nama_kecamatan": "Long Ikis"
                },
            ]
        },
        {
            "no_kabupaten": "4",
            "nama_kabupaten": "Berau",
            "kecamatan": [
                {
                    "no_kecamatan": "11",
                    "nama_kecamatan": "Tanjung Redeb"
                },
            ]
        },
        {
            "no_kabupaten": "5",
            "nama_kabupaten": "Bulungan",
            "kecamatan": [
                {
                    "no_kecamatan": "12",
                    "nama_kecamatan": "Tanjung Selor"
                },
            ]
        },
        {
            "no_kabupaten": "6",
            "nama_kabupaten": "Tarakan",
            "kecamatan": [
                {
                    "no_kecamatan": "13",
                    "nama_kecamatan": "Tarakan Tengah"
                },
                {
                    "no_kecamatan": "14",
                    "nama_kecamatan": "Tarakan Barat"
                }
            ]
        },
        {
            "no_kabupaten": "7",
            "nama_kabupaten": "Nunukan",
            "kecamatan": [
                {
                    "no_kecamatan": "15",
                    "nama_kecamatan": "Nunukan"
                },
            ]
        }
    ]

    const [idDealer, setIdDealer] = useState("")
    const [namaDealer, setNamaDealer] = useState("");
    const [alamat, setAlamat] = useState("");
    const [telepon, setTelepon] = useState("");
    const [dataKabupaten, setKabupaten] = useState("");
    const [dataKecamatan, setKecamatan ] = useState("");

    const [dealer, setDealer] = useState([]);

    const token = localStorage.getItem("token");

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const getIdDealer = (id) => {
        setIdDealer(id);
        setBasicModal(!basicModal)
    }

    useEffect(() => {
        Axios.get("https://backend-fix.glitch.me/dealer/",{
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setDealer(response.data['data']);
            console.log(dealer);
        })
    }, [])
    
    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 5; // Number of items to display per page

    const handleChangeKabupaten = (e) => {
        setKabupaten(e.target.value)
    }

    const handleChangeKecamatan = (e) => {
        setKecamatan(e.target.value)
    }

    const fillKecamatan = () => {
        let kecamatan = []
        for (let i = 0; i < kabupaten.length; i++) {
            if (kabupaten[i].nama_kabupaten === dataKabupaten) {
                kecamatan = kabupaten[i].kecamatan
            }
        }
        return kecamatan
    }

    const checkFormEmpty = () => {
        if (namaDealer === "" || alamat === "" || telepon === "" || dataKabupaten === "" || dataKecamatan === "") {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            "Nama_Ahass": namaDealer,
            "Alamat": alamat,
            "Telepon": telepon,
            "Kabupaten": dataKabupaten,
            "Kecamatan": dataKecamatan
        }
        if (checkFormEmpty()) {
            alert("Data tidak boleh kosong")
        } else {
            Axios.post(`https://backend-fix.glitch.me/dealer/edit/${idDealer}`, data, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            },
            ).then((response) => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch ((error) => {
                alert("Dealer Gagal Diubah: " + error['response']['data']['message']);
            })
        }
    }

    const deleteDealer = (id) => {
        Axios.delete(`https://backend-fix.glitch.me/dealer/delete/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        },
        ).then((response) => {
            alert(response.data.message);
            window.location.reload();
        })
        .catch ((error) => {
            alert("Dealer Gagal Dihapus: " + error['response']['data']['message']);
        })
    }

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
        const filteredData = csvData.map(({ _id, updatedAt, ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData);
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
                <MDBBtn 
                className="custom-button me-2" 
                color='primary' 
                size='sm'
                onClick={() => getIdDealer(item._id)}
                >Edit</MDBBtn>
                <MDBBtn 
                className="custom-button"
                color='danger' 
                size='sm'
                onClick={() => deleteDealer(item._id)}
                >Hapus</MDBBtn>
            </td>
          </tr>
        ));
    };

    useEffect(() => {
        Axios.get(`https://backend-fix.glitch.me/dealer/${idDealer}`,{
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setNamaDealer(response.data['data'][0]['Nama_Ahass']);
            setAlamat(response.data['data'][0]['Alamat']);
            setTelepon(response.data['data'][0]['Telepon']);
            setKabupaten(response.data['data'][0]['Kabupaten']);
            setKecamatan(response.data['data'][0]['Kecamatan']);
        })
    }, [])

    return (
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
            className="custom-button"
            color='success' 
            size='sm'
            onClick={(e) => {
                exportToCSV(dealer, 'Daftar Dealer');
            }}>Export Dealer</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex=''>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Dealer</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <Modal.Body>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                    <Col md={12} className="">
                                        <FormGroup>
                                            <FormLabel>Nama AHASS*</FormLabel>
                                            <FormControl 
                                            placeholder="Nama Ahass" 
                                            onChange={(e) => setNamaDealer(e.target.value)}
                                            value={namaDealer}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Alamat*</FormLabel>
                                                <FormControl 
                                                placeholder="" 
                                                onChange={(e) => setAlamat(e.target.value)}
                                                value={alamat}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Telepon*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setTelepon(e.target.value)}
                                                value={telepon}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormLabel>Kabupaten*</FormLabel>
                                            <FormSelect onChange={handleChangeKabupaten} value={dataKabupaten}>
                                                <option>Pilih Kabupaten</option>
                                                { kabupaten.map(kabupaten => (
                                                    <option value={kabupaten.nama_kabupaten} >{kabupaten.nama_kabupaten}</option>
                                                ))}
                                            </FormSelect>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormLabel>Kecamatan*</FormLabel>
                                            <FormSelect  onChange={handleChangeKecamatan} value={dataKecamatan}>
                                                <option>Pilih Kecamatan</option>
                                                { fillKecamatan().map(kecamatan => (
                                                    <option value={kecamatan.nama_kecamatan} >{kecamatan.nama_kecamatan}</option>
                                                ))}
                                            </FormSelect>
                                        </Col>
                                    </Row>
                                </Row>
                            </Modal.Body>
                        <MDBModalFooter>
                            <MDBBtn 
                            className="custom-button"
                            color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn
                            className="custom-button"
                            color='primary'
                            onClick={handleSubmit}
                            >Save changes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}

export default DaftarDealerAdmin;