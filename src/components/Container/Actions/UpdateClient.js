import React ,{useState, useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import { observer, inject } from 'mobx-react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import './styles/updateClient.css'
import { withRouter } from "react-router";


function UpdateClient(props) {
    let [clients, setClients] = useState([...props.clients.clients])
    const [client, setClient] = useState({})
    const [emailType, setEmailType] = useState("")
    const [owner, setOwner] = useState("")

    const updateClient = clientsData => setClients(clients = [...clientsData])

    useEffect(() => {
        updateClient(props.clients.clients)
        // console.log(clients)
    })

    const handleChange = event => {
        let target = event.target
        let value = target.value
        let name =  target.name

        if(name === 'client') setClient(clients[value])
        if(name === 'emailType') setEmailType(value)
        if(name === 'owner') setOwner(value)
    }
    
    const handleSold = () => {
        props.clients.updateSold(client._id)
        props.history.push("/clients")
    }

    const handleTransfer = () => {
        props.clients.updateOwner(client._id, owner)
        props.history.push("/clients")
    }

    const handleSendEmail = () => {
        props.clients.updateEmailType(client._id, emailType)
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
                        {/* <option as="button" disabled selected="selected" >Please Select Client</option> */}
                        {clients.map((client, index) =>  <option key={index} value={index} >{client.first} {client.last}</option>)}
                    </select>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={3}>
                    Transfer Ownership to
                </Form.Label>
                <Col  lg={3}>
                    <select size="sm" id="dropdown-item-button-owner" name="owner" className="form-control" onChange={handleChange} title="Owner">
                        <option  value={null} as="button" disabled selected="selected" > Null</option>
                        {clients.map((clientOnMap,index) =>  <option key={index} value={clientOnMap.owner} as="button" selected={clientOnMap.owner === client.owner ? "selected": null}>{clientOnMap.owner}</option>)}
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
                        <option  value={null} as="button" disabled selected="selected" > Null</option>
                        <option key="A" as="button" selected={client.emailType === "A" ? "selected": null} >A</option>
                        <option key="B" as="button" selected={client.emailType === "B" ? "selected": null} >B</option>
                        <option key="C" as="button" selected={client.emailType === "C" ? "selected": null} >C</option>
                        <option key="D" as="button" selected={client.emailType === "D" ? "selected": null} >D</option>
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
  
 