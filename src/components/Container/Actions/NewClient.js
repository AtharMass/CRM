import React ,{useState, useEffect}  from 'react'
import Form from 'react-bootstrap/Form'
import { observer, inject } from 'mobx-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './styles/newClient.css'
import axios from 'axios'
import { withRouter } from "react-router"


function NewClient(props) {
    const [name, setName] = useState("")
    const [countries, setCountries] = useState([])
    const [surname, setSurname] = useState("")
    const [country, setCountry] = useState("")
    const [owner, setOwner] = useState("")
    const [email, setEmail] = useState("")

    const getCountries = async () => {
        return  axios.get("http://localhost:8080/countries")
    }
  
     useEffect( () => {
            async function fetchData() {
                const countriesData = await getCountries()
                setCountries(countriesData.data)
            }
            fetchData()
    },[])
       
    const handleChange = event => {
        let target = event.target
        let value = target.value
        let name =  target.name

        if(name === 'name') setName(value)
        if(name === 'surname') setSurname(value)
        if(name === 'country') setCountry(value)
        if(name === 'owner') setOwner(value)
        if(name === 'email') setEmail(value)
    }

    const handleInsert = async () => {
        let client ={
            first: name,
            last: surname,
            email: email,
            owner: owner || "Emily Durham",
            country: country || "Albania",
            date: null,
            emailType: null,
            sold: false
        }
        props.clients.addClient(null,name,surname,email,owner,country,null,null,false)
        // const response = await addNewClient(client)
        // console.log(response)
        console.log("Client successfully added with values name:", name, ", surename:  ", surname, ", country:  ", country)
        props.history.push("/clients")
    }
    
    return (
        <div className="form-new-client-style">
            <Row className="mt-3">
                <Form.Label column="sm" lg={2}>
                    Name
                </Form.Label>
                <Col>
                    <Form.Control size="sm" type="text" name="name" placeholder="Name" defaultValue={name} onChange={handleChange}/>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={2}>
                    Surname
                </Form.Label>
                <Col>
                    <Form.Control size="sm" type="text" name="surname" placeholder="Surname" defaultValue={surname} onChange={handleChange}/>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={2}>
                    Country
                </Form.Label>
                <Col> 
                    {
                        <select id="dropdown-item-button-client" className="form-control" name="country" onChange={handleChange}>
                            {countries.map(country =>  <option key={country.id}  value={country.country} >{country.country} </option>)}
                        </select>
                   
                    }
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={2}>
                    Email
                </Form.Label>
                <Col>
                    <Form.Control size="sm" type="text" name="email" placeholder="Email" defaultValue={email} onChange={handleChange}/>
                </Col>
            </Row>

            <Row className="mt-3">
                <Form.Label column="sm" lg={2}>
                    Owner
                </Form.Label>
                <Col>
                    {
                        <select id="dropdown-item-button-client" className="form-control" name="owner" onChange={handleChange}>
                            {props.owners.map(owner =>  <option key={owner.id}  value={owner.owner} >{owner.owner} </option>)}
                        </select>
                    }
                    {/* <Form.Control size="sm" type="text" name="owner" placeholder="Owner" defaultValue={owner} onChange={handleChange}/> */}
                </Col>
            </Row>
            
            <Row className="mt-3">
                <Col column="sm" lg={2}></Col>
                <Col column="sm" lg={4}>
                    < Button  variant="warning" className="add-new-client-button" onClick={handleInsert}> Add New Client</Button>
                </Col>
            </Row>
            
        </div>
    );
  }
  
  export default  inject("clients")(observer( withRouter(NewClient)))
  

