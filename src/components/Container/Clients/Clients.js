import React from 'react';
import { observer, inject } from 'mobx-react'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import './styles/clients.css'
import Client  from './Client'

function Clients(props) {
    
    return (
        <Card className="card-clients-style  pb-4">  
            <Card.Header className="clients-section-header">Clients</Card.Header>
            <Card.Body>
                <Table size="sm" className="table-style">
                    <thead>
                        <tr className="th-custome-style">
                            <th>Name</th>
                            <th>Surename</th>
                            <th>E-mail</th>
                            <th>Country</th>
                            <th>First Contact</th>
                            <th>E-mail Type</th>
                            <th>Sold</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.clients.clients.map((client, index) => <Client key={index} client={client}/>)}
                    </tbody>
                </Table>
                <Pagination>
               {/* { props.clients.numClients/20.forEach(element => {
                   
               }); } */}
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
                {/* active */}
                {/* .slice(0,20) */}
            </Card.Body>
        </Card>
    );
  }
  
  export default inject("clients")(observer(Clients))
  
  