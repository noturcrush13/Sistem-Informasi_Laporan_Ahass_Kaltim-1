import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../dealer.css'



function DaftarDealerAdmin () {
    return (
        <div >
            <SubTitleComponent title="Dealer" subtitle="Daftar Dealer"/>
        </div>
    )
}

export default DaftarDealerAdmin;