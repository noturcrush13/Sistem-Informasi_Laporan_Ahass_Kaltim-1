import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import { Pagination } from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

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

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-harian.css";

function TampilLaporanHarianAdmin(){

    const [unit_entry, setUnitEntry] = useState("");
    const [kpb_1, setKpb1] = useState("");
    const [mekanik, setMekanik] = useState("");
    const [kpb_2, setKpb2] = useState("");
    const [heavy_repair, setHeavyRepair] = useState("");
    const [kpb_3, setKpb3] = useState("");
    const [jobreturn, setJobreturn] = useState("");
    const [kpb_4, setKpb4] = useState("");
    const [jumlahUEbyServiceVisit, setJumlahUEbyServiceVisit] = useState("");
    const [claim, setClaim] = useState("");
    const [otherjob, setOtherJob] = useState("");
    const [servicelengkap, setServiceLengkap] = useState("");
    const [jumlahUEbyPitExpress, setJumlahUEbyPitExpress] = useState("");
    const [serviceringan, setServiceRingan] = useState("");
    const [pendapatanJasa, setPendapatanJasa] = useState("");
    const [gantiOli, setGantiOli] = useState("");
    const [penjualanPart, setPenjualanPart] = useState("");
    const [lightRepair, setLightRepair] = useState("");
    const [penjualanOli, setPenjualanOli] = useState("");
    const [jumlahUEbyReminder, setJumlahUEbyReminder] = useState("");
    const [jumlahUEbyAHASSEvent, setJumlahUEbyAHASSEvent] = useState("");
    const [jumlahUEbyEngineFlush, setJumlahUEbyEngineFlush] = useState("");
    const [jumlahUEbyInjectorCleaner, setJumlahUEbyInjectorCleaner] = useState("");

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const [id_laporan , setIdLaporan] = useState('')

    const searchParams = useQuery();
    const noAhass = searchParams.get('noAhass');
    const tanggalAwal = searchParams.get('tanggalAwal');
    const tanggalAkhir = searchParams.get('tanggalAkhir');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

    const token = localStorage.getItem("token");

    const getIdLaporan = (id_laporan) => {
        setIdLaporan(id_laporan);
        setBasicModal(!basicModal)
    }

    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 3; // Number of items to display per page

    const exportToCSV = (csvData, fileName) => {
        // const filteredData = csvData.map(({ _id, penjualan_part, pendapatan_jasa, penjualan_oli,__v,  ...rest }) => rest);
        const filteredData = csvData.map(({ _id, __v,  ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: filetype});
        FileSaver.saveAs(data, fileName + fileextension);
    }


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

    const isEmpty = (e) => {
        e.preventDefault();
        if(unit_entry === "" || kpb_1 === "" || mekanik === "" || kpb_2 === "" || heavy_repair === "" || kpb_3 === "" || jobreturn === "" || kpb_4 === "" || jumlahUEbyServiceVisit === "" || claim === "" || otherjob === "" || servicelengkap === "" || jumlahUEbyPitExpress === "" || serviceringan === "" || pendapatanJasa === "" || gantiOli === "" || penjualanPart === "" || lightRepair === "" || penjualanOli === "" || jumlahUEbyReminder === "" || jumlahUEbyAHASSEvent === "" || jumlahUEbyEngineFlush === "" || jumlahUEbyInjectorCleaner === "") {
            alert("Data tidak boleh kosong")
            return false;
        }
        else {
            return true;
        }
    }

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
                        <MDBBtn 
                        className="custom-button me-2" 
                        color='primary' 
                        size='sm'
                        onClick={() => getIdLaporan(item._id)}
                        // onClick={toggleShow}
                        >Edit</MDBBtn>
                        <MDBBtn 
                        className="custom-button"
                        color='danger' 
                        size='sm'
                        onClick={() => deleteLaporan(item._id)}
                        >Hapus</MDBBtn>
                    </td>
                </tr>
        ));
    }

    const deleteLaporan = (id) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/laporan/delete/${id}`, {
            headers : {
                "Authorization" : `Bearer ${token}`,
            }
        })
        .then((res) => {
            alert("Data berhasil dihapus")
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            total_mekanik: mekanik,
            unit_entry: unit_entry,
            KPB_1: kpb_1,
            KPB_2: kpb_2,
            KPB_3: kpb_3,
            KPB_4: kpb_4,
            claim: claim,
            service_lengkap: servicelengkap,
            service_ringan: serviceringan,
            ganti_oli: gantiOli,
            light_repair: lightRepair,
            heavy_repair: heavy_repair,
            job_return: jobreturn,
            other_job: otherjob,
            jumlah_ue_by_service_visit: jumlahUEbyServiceVisit,
            jumlah_ue_by_pit_express: jumlahUEbyPitExpress,
            ue_by_reminder: jumlahUEbyReminder,
            ue_by_ahass_event: jumlahUEbyAHASSEvent,
            ue_by_engine_flush: jumlahUEbyEngineFlush,
            ue_by_injector_cleaner: jumlahUEbyInjectorCleaner,
            pendapatan_jasa: pendapatanJasa,
            penjualan_part: penjualanPart,
            penjualan_oli: penjualanOli,
        }
        if(isEmpty(e)) {
            Axios.post(`http://localhost:3001/laporan/update/${id_laporan}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then((response) => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                alert("Laporan Gagal Diubah: " + error['response']['data']['message']);
            });
        }
        
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
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
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3001/laporan/${id_laporan}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setUnitEntry(response.data.data[0].unit_entry);
            setKpb1(response.data.data[0].KPB_1);
            setMekanik(response.data.data[0].total_mekanik);
            setKpb2(response.data.data[0].KPB_2);
            setHeavyRepair(response.data.data[0].heavy_repair);
            setKpb3(response.data.data[0].KPB_3);
            setJobreturn(response.data.data[0].job_return);
            setKpb4(response.data.data[0].KPB_4);
            setJumlahUEbyServiceVisit(response.data.data[0].jumlah_ue_by_service_visit);
            setClaim(response.data.data[0].claim);
            setOtherJob(response.data.data[0].other_job);
            setServiceLengkap(response.data.data[0].service_lengkap);
            setJumlahUEbyPitExpress(response.data.data[0].jumlah_ue_by_pit_express);
            setServiceRingan(response.data.data[0].service_ringan);
            setPendapatanJasa(response.data.data[0].pendapatan_jasa);
            setGantiOli(response.data.data[0].ganti_oli);
            setPenjualanPart(response.data.data[0].penjualan_part);
            setLightRepair(response.data.data[0].light_repair);
            setPenjualanOli(response.data.data[0].penjualan_oli);
            setJumlahUEbyReminder(response.data.data[0].ue_by_reminder);
            setJumlahUEbyAHASSEvent(response.data.data[0].ue_by_ahass_event);
            setJumlahUEbyEngineFlush(response.data.data[0].ue_by_engine_flush);
            setJumlahUEbyInjectorCleaner(response.data.data[0].ue_by_injector_cleaner);
            console.log(response.data.data[0]);
        })
    }, [id_laporan])

    return (
        // console.log(laporan),
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
                            exportToCSV(laporan, 'laporan_harian.csv')
                        }}>Export Laporan
                    </MDBBtn>
                </Col>
            </Row>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex=''>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Laporan</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <Modal.Body>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                    <Col md={12} className="">
                                        <FormGroup>
                                            <FormLabel>Unit Entry*</FormLabel>
                                            <FormControl 
                                            type="number" 
                                            placeholder="Total Unit Entry" 
                                            onChange={(e) => setUnitEntry(e.target.value)}
                                            value={unit_entry}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>KPB 1*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setKpb1(e.target.value)}
                                                value={kpb_1}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Mekanik*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setMekanik(e.target.value)}
                                                value={mekanik}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>KPB 2*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setKpb2(e.target.value)}
                                                value={kpb_2}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Heavy Repair*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setHeavyRepair(e.target.value)}
                                                value={heavy_repair}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>KPB 3*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setKpb3(e.target.value)}
                                                value={kpb_3}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Job Return*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setJobreturn(e.target.value)}
                                                value={jobreturn}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>KPB 4*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setKpb4(e.target.value)}
                                                value={kpb_4}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Jumlah UE By Service Visit*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setJumlahUEbyServiceVisit(e.target.value)}
                                                value={jumlahUEbyServiceVisit}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Claim*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setClaim(e.target.value)}
                                                value={claim}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Other Job*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setOtherJob(e.target.value)}
                                                value={otherjob}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Service Lengkap*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setServiceLengkap(e.target.value)}
                                                value={servicelengkap}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Jumlah UE By Pit Express*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setJumlahUEbyPitExpress(e.target.value)}
                                                value={jumlahUEbyPitExpress}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Service Ringan*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setServiceRingan(e.target.value)}
                                                value={serviceringan}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Pendapatan Jasa*</FormLabel>
                                                <InputGroup>
                                                    <InputGroup.Text>Rp.</InputGroup.Text>
                                                    <FormControl 
                                                    type="number" 
                                                    placeholder="" 
                                                    id="inlineFormInputGroup"
                                                    onChange={(e) => setPendapatanJasa(e.target.value)}
                                                    value={pendapatanJasa}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Ganti Oli*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setGantiOli(e.target.value)}
                                                value={gantiOli}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Penjualan Part*</FormLabel>
                                                <InputGroup>
                                                    <InputGroup.Text>Rp.</InputGroup.Text>
                                                    <FormControl 
                                                    type="number" 
                                                    placeholder="" 
                                                    id="inlineFormInputGroup"
                                                    onChange={(e) => setPenjualanPart(e.target.value)}
                                                    value={penjualanPart}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Light Repair*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setLightRepair(e.target.value)}
                                                value={lightRepair}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Penjualan Oli*</FormLabel>
                                                <InputGroup>
                                                    <InputGroup.Text>Rp.</InputGroup.Text>
                                                    <FormControl 
                                                    type="number" 
                                                    placeholder="" 
                                                    id="inlineFormInputGroup"
                                                    onChange={(e) => setPenjualanOli(e.target.value)}
                                                    value={penjualanOli}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Jumlah UE By Reminder*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setJumlahUEbyReminder(e.target.value)}
                                                value={jumlahUEbyReminder}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Jumlah UE By AHASS Event*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setJumlahUEbyAHASSEvent(e.target.value)}
                                                value={jumlahUEbyAHASSEvent}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Jumlah UE By Engine Flush*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder="" 
                                                onChange={(e) => setJumlahUEbyEngineFlush(e.target.value)}
                                                value={jumlahUEbyEngineFlush}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                        <FormGroup>
                                                <FormLabel>Jumlah UE By Injector Cleaner*</FormLabel>
                                                <FormControl 
                                                type="number" 
                                                placeholder=""
                                                onChange={(e) => setJumlahUEbyInjectorCleaner(e.target.value)}
                                                value={jumlahUEbyInjectorCleaner}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Row>
                            </Modal.Body>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn
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

export default TampilLaporanHarianAdmin;