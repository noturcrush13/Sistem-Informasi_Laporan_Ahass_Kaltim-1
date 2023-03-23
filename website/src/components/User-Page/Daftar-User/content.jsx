import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../user.css'


function DaftarUserAdmin () {
    return (
        <div >
            <SubTitleComponent title="User" subtitle="Daftar User"/>
        </div>
    )
}

export default DaftarUserAdmin;