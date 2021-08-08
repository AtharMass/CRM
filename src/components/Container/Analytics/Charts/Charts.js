import React from 'react';
import TopEmployees from './TopEmployees'
import Sales from './Sales'
import CardGroup from 'react-bootstrap/CardGroup'

function Charts() {
    return (
        <CardGroup>
           <TopEmployees/>
           <Sales/>
        </CardGroup>
    );
  }
  
export default Charts;