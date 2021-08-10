import React,{useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import NewClient from './NewClient'
import UpdateClient from './UpdateClient'
import './styles/actions.css'
import axios from 'axios'
import { observer, inject } from 'mobx-react'

function Actions(props) {
    const [owners, setOwners] = useState([])

    const getOwners = () => {
        return  axios.get("http://localhost:8080/owners")
    }

    useEffect( () => {
        async function fetchData() {
            const ownersData = await getOwners()
            setOwners(ownersData.data)
        }
        fetchData()
    },[])

    return (
        <Card className="card-actions-style  pb-4">  
            <Card.Body className="card-body-actions">
                <Tabs defaultActiveKey="newClient" id="uncontrolled-tab-example" className="m-0 border-style-custome">
                    <Tab eventKey="newClient" title="Add New Client">
                        <NewClient owners={owners}/>
                    </Tab>
                    <Tab eventKey="updateClient" title="Update Client">
                        <UpdateClient owners={owners} clientsData={props.clients.clients}/>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    );
  }
  
  export default  inject("clients")(observer( Actions))
  