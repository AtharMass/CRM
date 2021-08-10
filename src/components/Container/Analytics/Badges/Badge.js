import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import '../styles/badge.css'


function Badge(props) {
    return (
       
        <Card className="badge-style m-3 pb-4"> 
            <Row className="mt-3">
                <Form.Label column="sm" lg={4}>
                    
                        <Image src={ props.badge.image} className="icon-style"  roundedCircle />
                   
                </Form.Label>
                <Col  lg={8}>
                    <Card.Title className="badge-value-style">{props.badge.value}</Card.Title>
                    <Card.Text className="badge-description-style" >{props.badge.description}</Card.Text>    
                </Col>
            </Row>
        </Card>
    );
  }
  
export default Badge;
  


