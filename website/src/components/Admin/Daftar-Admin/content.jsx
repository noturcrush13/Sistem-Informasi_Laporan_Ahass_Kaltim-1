import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../admin.css'


function DaftarAdmin () {
    return (
        <div >
            <SubTitleComponent title="Admin" subtitle="Daftar Admin"/>
        </div>
    )
}

export default DaftarAdmin;