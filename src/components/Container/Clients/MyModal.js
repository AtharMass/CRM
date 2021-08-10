import './styles/client.css' 
import { observer, inject } from 'mobx-react'
import React  ,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './styles/mymodal.css'
import { MdClose } from 'react-icons/md'


function MyModal(props) {
  const [first, setFirst] = useState(props.client.first)
  const [last, setLast] = useState(props.client.last)
  const [country, setCountry] = useState(props.client.country)
  

  const handleChange = event => {
    let target = event.target
    let value = target.value
    let name =  target.name

    if(name === 'name') setFirst(value)
    if(name === 'surname') setLast(value)
    if(name === 'country') setCountry(value)
  }

  const handleUpdate = async () => {
    props.onChange(props.client.id, first, last, country)
    props.onHide()
  }
  
  return (
    <Modal {...props} centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Update Client
        </Modal.Title>
        <Button variant="secondary" size="sm" className="rounded-circle" onClick={props.onHide}><MdClose/></Button>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Form.Label column="sm" lg={2}>
            Name
          </Form.Label>
          <Col>
            <Form.Control size="sm" type="text" name="name" placeholder="Name" defaultValue={first} onChange={handleChange}/>
          </Col>
        </Row>

        <Row className="mt-3">
          <Form.Label column="sm" lg={2}>
            Surname
          </Form.Label>
          <Col>
            <Form.Control size="sm" type="text" name="surname" placeholder="Surname" defaultValue={last} onChange={handleChange}/>
          </Col>
        </Row>

        <Row className="mt-3">
            <Form.Label column="sm" lg={2}>
                Country
            </Form.Label>
            <Col> 
                {
                    <select id="dropdown-item-button-client" className="form-control" defaultValue={country} name="country" onChange={handleChange}>
                      
                        {props.countries.map(country =>  
                          <option key={country.id}  value={country.country} >
                            {country.country} 
                          </option>
                          )}
                    </select>
                }
            </Col>
          {/* <Form.Label column="sm" lg={2}>
            Country
          </Form.Label>
          <Col>
            <Form.Control size="sm" type="text" name="country" placeholder="Country" defaultValue={country} onChange={handleChange}/>
          </Col> */}
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" className="button-custome-style" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default inject("clients")(observer(MyModal))
