import React from 'react';
import { observer, inject } from 'mobx-react'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import NewClient from './NewClient'
import UpdateClient from './UpdateClient'
import './styles/actions.css'

function Actions() {
    return (
        <Card className="card-actions-style  pb-4">  
            <Card.Body className="card-body-actions">
                <Tabs defaultActiveKey="newClient" id="uncontrolled-tab-example" className="m-0 border-style-custome">
                    <Tab eventKey="newClient" title="Add New Client">
                        <NewClient/>
                    </Tab>
                    <Tab eventKey="updateClient" title="Update Client">
                        <UpdateClient/>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    );
  }
  
  export default  inject("clients")(observer(Actions))
  