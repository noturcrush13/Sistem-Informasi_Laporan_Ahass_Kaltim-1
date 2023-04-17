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
import Logo from "../../assets/img/logo-ahass.png";
import { useNavigate } from "react-router-dom";

function Content() {

    const navigate = useNavigate();
    
    return (
        <div className="">
            <Image src={Background} className="" style={{height:"100%", width:"100%"}} fluid/>
            <Container className="mx-auto" style={{position:"absolute", top:"10%"}}>
                {/* <Row style={{}}> */}
                    <Col md={12} className="title-login" style={{width:"100vw"}}>
                        <Container className="justify-content-center mx-auto p-2"style={{backgroundColor:"white", width:"50%", borderRadius:"1rem"}}>
                            <h1 className="title-login">SISKA</h1>
                            <h3 className="title-login">Sistem Informasi Servis Kaltim 1</h3>
                        </Container>
                    </Col>
                    <MDBContainer fluid style={{width:"100vw"}}>
                        <MDBRow className='d-flex justify-content-center align-items-center h-50'>
                            <MDBCol col='12'>
                                <MDBCard className='my-5 mx-auto' style={{borderRadius: '1rem', width:"45%", backgroundColor:"white"}}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                        <Image src={Logo} className='mx-auto mb-3' style={{width:"50%", alignItems:"center"}}/>
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Username</p>} id='form1' type='' size="lg"/>
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Password</p>} id='form1' type='password' size="lg"/>
                                        <Button className="sm mx-auto w-50 mb-5" style={{backgroundColor:"#C71C15"}} onClick={() => navigate("/dashboard")}>
                                            Login
                                        </Button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                {/* </Row> */}
            </Container>
        </div>
    );
}

export default Content;
