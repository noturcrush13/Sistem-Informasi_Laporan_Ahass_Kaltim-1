import React, { useState, useEffect } from "react";
import Axios from "axios";
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

    const isEmpty = (value) => {
        return !value || !value.trim();
    }

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if(isEmpty(username) || isEmpty(password)){
            alert("Username atau Password tidak boleh kosong");
        }else{
            Axios.post("http://localhost:3001/admin/login", {
                username: username,
                password: password,
            }).then((response) => {
                if(response.data.message){
                    localStorage.setItem("token", response.data.token)
                    navigate("/admin/dashboard");
                }else{
                    alert(response.data);
                }
            });
        }
    }
        
    
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
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Username</p>} id='form1' type='' size="lg"
                                        onChange={(event) => setUsername(event.target.value)} value={username} 
                                        />
                                        <MDBInput wrapperClass='mb-1 w-50 mx-auto' label={<p style={{fontFamily:"serif", fontSize:"14px"}}>Password</p>} id='form1' type='password' size="lg"
                                        onChange={(event) => setPassword(event.target.value)} value={password}
                                        />
                                        <Button className="sm mx-auto w-50 mb-5" style={{backgroundColor:"#C71C15"}} 
                                        onClick={handleLogin}
                                        >
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
