import React, { useState } from "react";

import Axios from "axios";

import {Container, Row, Col, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./buat-laporan.css";

function BuatLaporanUser () {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    const [tanggal, setTanggal] = useState(new Date());
    const [user_entry, setUserEntry] = useState("");
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
    
    const isEmpty = (e) => {
        e.preventDefault();
        if( tanggal === "" || user_entry === "" || kpb_1 === "" || mekanik === "" || kpb_2 === "" || heavy_repair === "" || kpb_3 === "" || jobreturn === "" || kpb_4 === "" || jumlahUEbyServiceVisit === "" || claim === "" || otherjob === "" || servicelengkap === "" || jumlahUEbyPitExpress === "" || serviceringan === "" || pendapatanJasa === "" || gantiOli === "" || penjualanPart === "" || lightRepair === "" || penjualanOli === "" || jumlahUEbyReminder === "" || jumlahUEbyAHASSEvent === "" || jumlahUEbyEngineFlush === "" || jumlahUEbyInjectorCleaner === "") {
            alert("Data tidak boleh kosong")
            return false;
        }
        else {
            return true;
        }
    }

    const resetInput = () => {
        setTanggal(new Date());
        setUserEntry("");
        setKpb1("");
        setMekanik("");
        setKpb2("");
        setHeavyRepair("");
        setKpb3("");
        setJobreturn("");
        setKpb4("");
        setJumlahUEbyServiceVisit("");
        setClaim("");
        setOtherJob("");
        setServiceLengkap("");
        setJumlahUEbyPitExpress("");
        setServiceRingan("");
        setPendapatanJasa("");
        setGantiOli("");
        setPenjualanPart("");
        setLightRepair("");
        setPenjualanOli("");
        setJumlahUEbyReminder("");
        setJumlahUEbyAHASSEvent("");
        setJumlahUEbyEngineFlush("");
        setJumlahUEbyInjectorCleaner("");
    }

    const handleReset = (e) => {
        e.preventDefault();
        // console.log("reset");
        resetInput();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id_dealer: id_user,
            id_laporan_bulanan: tanggal,
            tanggal: tanggal,
            total_mekanik: mekanik,
            unit_entry: user_entry,
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
        if (isEmpty(e)) {
            Axios.post("https://backend-fix.glitch.me/laporan/create", data, {
              headers: {
                "Authorization": `Bearer ${token}`,
              }
            })
              .then((response) => {
                console.log(response.data);
                if (response.data['status'] === "error") {
                  alert("Laporan Gagal DiSubmit: " + response.data['message']);
                } else {
                  alert("Laporan Berhasil DiSubmit");
                }
              })
              .catch((error) => {
                alert("Laporan Gagal DiSubmit: " + error['response']['data']['message']);
                console.log("ini error", error['response']['data']['message'])
              });
          }
          
    }


    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Buat Laporan Harian Baru"/>
            <Container fluid>
            <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Tanggal*</FormLabel>
                            <FormControl 
                            type="date" 
                            placeholder="Tanggal"
                            onChange={(e) => setTanggal(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Unit Entry*</FormLabel>
                            <FormControl 
                            type="number" 
                            placeholder="Total Unit Entry" 
                            onChange={(e) => setUserEntry(e.target.value)}
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
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button 
                        className="button-form sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#C71C15"}}
                        onClick={handleSubmit}
                        >Kumpul Laporan Harian</Button>
                    </Col>
                    <Col md={10}>
                        <Button 
                        className="button-form sm mx-auto w-100 mb-5" 
                        type="reset"
                        style={{backgroundColor:"white", border:"2px solid #820000", color:"#820000",}}
                        onClick={handleReset}
                        >Reset</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatLaporanUser;