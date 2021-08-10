import React ,{useState, useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import { observer, inject } from 'mobx-react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import './styles/updateClient.css'
import { withRouter } from "react-router";
import axios from 'axios'

function UpdateClient(props) {

    const [client, setClient] = useState({})
    const [emailType, setEmailType] = useState("")
    const [owner, setOwner] = useState("")

    const handleChange =  event => {
        let target = event.target
        let value = target.value
        let name =  target.name

        if(name === 'client') setClient({...props.clientsData[value]})
        if(name === 'emailType') setEmailType(value)
        if(name === 'owner') setOwner(value)
    }
    
    const handleSold = () => {
        props.clients.updateSold(client.id)
        props.history.push("/clients")
    }

    const handleTransfer = () => {
        props.clients.updateOwner(client.id, owner)
        props.history.push("/clients")
    }

    const handleSendEmail = () => {
        props.clients.updateEmailType(client.id, emailType)
        props.history.push("/clients")
    }
    
    return (
        <div className="form-new-client-style">
            <Row className="mt-3">
                <Form.Label column="sm" lg={3}>
                    Client
                </Form.Label>
                <Col  lg={3}>
                    <select id="dropdown-item-button-client" className="form-control" name="client" onChange={handleChange}>
                        {props.clientsData.map((client, index) =>  <option key={index} value={index} >{client.first} {client.last}</option>)}
                    </select>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={3}>
                    Transfer Ownership to
                </Form.Label>
                <Col  lg={3}>
                    <select size="sm" id="dropdown-item-button-owner" name="owner" className="form-control" onChange={handleChange} title="Owner">
                        {/* <option  value={null} as="button" disabled selected="selected" > Null</option> defaultValue={client.country} */}
                        {props.owners.map(owner =>  <option key={owner.id}  value={owner.owner} selected={owner.owner === client.owner ? "selected" : null} >{owner.owner} </option>)}
                        {/* {clients.map((clientOnMap,index) =>  <option key={index} value={clientOnMap.owner} as="button" selected={clientOnMap.owner === client.owner ? "selected": null}>{clientOnMap.owner}</option>)} */}
                    </select>
                </Col>
                <Col  lg={2}>
                    <Button className="btn-update-custome" size="sm" variant="outline-warning"  onClick={handleTransfer}>
                        TRANSFER
                    </Button>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={3}>
                    Send Email
                </Form.Label>
                <Col  lg={3}>
                    <select size="sm" id="dropdown-item-button-email-type" name="emailType"  onChange={handleChange} className="form-control "  title="Email Type">
                        <option  value={null} as="button" disabled selected={client.email_type === null ? "selected": null} > Null</option>
                        <option key="A" as="button" value="A" selected={client.email_type === "A" ? "selected": null} >A</option>
                        <option key="B" as="button" value="B" selected={client.email_type === "B" ? "selected": null} >B</option>
                        <option key="C" as="button" value="C" selected={client.email_type === "C" ? "selected": null} >C</option>
                        <option key="D" as="button" value="D" selected={client.email_type === "D" ? "selected": null} >D</option>
                    </select>
                </Col>
                <Col lg={2}>
                    <Button className="btn-update-custome" size="sm" variant="outline-warning" onClick={handleSendEmail}>
                        SEND
                    </Button>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={3}>
                    Declare Sale!
                </Form.Label>
                <Col  lg={3}>
                    
                </Col>
                <Col  lg={2}>
                    {!client.sold ? <Button className="btn-update-custome" size="sm" variant="outline-warning"  onClick={handleSold}> DECLARE </Button> : <Button className="btn-update-custome" size="sm" variant="outline-warning" disabled> DECLARE </Button>} 
                    
                </Col>
            </Row>
            
        </div>
    )
  }
  
  export default  inject("clients")(observer( withRouter(UpdateClient)))
  
 