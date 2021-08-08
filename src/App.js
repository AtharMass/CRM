import { BrowserRouter as Router} from 'react-router-dom'
import React ,{useEffect} from 'react'
import NavBar from './components/Navbar/NavBar'
import Container from './components/Container/Container'
import { observer, inject } from 'mobx-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import './App.css'

function App(props) {

  const getClients = async () => {
   return  axios.get("http://localhost:8080/clients")
  }

  const setClientsData = async () => {
    const clientsData = await getClients()
    props.clients.storeClient(clientsData.data)
  }

  useEffect( () => {
    setClientsData()
  })

  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Container />
      </div>
    </Router>
  )
}

export default inject("clients")(observer(App))
