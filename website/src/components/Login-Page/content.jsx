import React from "react";
import Background from "../../assets/img/Background-Login.png";
import {Container, Row, Col, Image, Button} from "react-bootstrap";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';
import "./login-style.css";
import Logo from "../../assets/img/Logo-Astra-Abu.png";
import { useNavigate } from "react-router-dom";

function Content() {

    const navigate = useNavigate();
    
    return (
        <div className="">
            <Image src={Background} className="" style={{height:"100vh", width:"100vw"}} fluid/>
            <Container fluid>
                <Row style={{position:"absolute", top:"7%"}}>
                    <Col md={12} className="title">
                        <Container className="justify-content-center mx-auto">Sistem Informasi Laporan AHASS Kaltim 1</Container>
                    </Col>
                    <MDBContainer fluid>
                        <MDBRow className='d-flex justify-content-center align-items-center h-50'>
                            <MDBCol col='12'>
                                <MDBCard className='my-5 mx-auto' style={{borderRadius: '1rem', width:"50%", backgroundColor:"#D2D2D2"}}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                        <Image src={Logo} className='mx-auto mb-3' style={{width:"50%", alignItems:"center"}}/>
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Username</p>} id='form1' type='' size="lg"/>
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Password</p>} id='form1' type='password' size="lg"/>
                                        <Button className="sm mx-auto w-50 mb-5" style={{backgroundColor:"#820000"}} onClick={() => navigate("/dashboard")}>
                                            Login
                                        </Button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Row>
            </Container>
        </div>
    );
}

export default Content;
