import { BrowserRouter as Router} from 'react-router-dom'
import React ,{useEffect} from 'react'
import NavBar from './components/Navbar/NavBar'
import Container from './components/Container/Container'
import { observer, inject } from 'mobx-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App(props) {
  
  const setClientsData = async () => {
    props.clients.storeClient()
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
