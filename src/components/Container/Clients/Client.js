import './styles/client.css' 
import React ,{useState, useEffect} from 'react'
import MyModal from './MyModal'
import {IoCloseSharp, IoCheckmarkSharp} from 'react-icons/io5';  
import {AiOutlineMinus} from 'react-icons/ai'; 
import { observer, inject } from 'mobx-react'

function Client(props) {
    const [modalShow, setModalShow] = useState(false);
    const [first, setFirst] = useState(props.client.first);
    const [last, setLast] = useState(props.client.last);
    const [country, setCountry] = useState(props.client.country);

    useEffect(() => {
        setFirst(props.client.first)
        setLast(props.client.last)
        setCountry(props.client.country)
    })

    const updateClientValues = (id, first, last, country) => {
        if(id && first && last && country)
            props.clients.updateClient(id, first, last, country)
    }

    return (
        <>
        <MyModal show={modalShow} client={props.client}  onChange ={updateClientValues} onHide={() => setModalShow(false)} />
        <tr  className="client-row" onClick={() => setModalShow(true)}>
            <td>{first}</td>
            <td>{last}</td>
            <td>{props.client.email}</td>
            <td>{country}</td>
            <td>{props.client.date}</td>
            <td>{!props.client.emailType ? <AiOutlineMinus/> : props.client.emailType }</td>
            <td>{props.client.sold ? <IoCheckmarkSharp/> : <IoCloseSharp/> }</td>
            <td>{props.client.owner}</td>
       </tr> 
       </>
    );
}
    
export default  inject("clients")(observer(Client))
    