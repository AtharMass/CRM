import { observable,action, makeObservable, computed } from 'mobx'
import { Client } from './Client'
import axios from 'axios'

export class Clients {

    constructor() {
        this.clients = []

        makeObservable(this, {
            clients: observable,
            storeClient: action,
            addClient: action,
            updateClient: action,
            updateSold: action,
            updateOwner: action,
            updateEmailType: action,

            numClients: computed, 
            addNewClient: action
        })
    }

    getClients = ()=>{
        return  axios.get("http://localhost:8080/clients")
    }

    storeClient = async () => {
       let clients = await this.getClients()
       this.clients = [...clients.data]
       console.log( this.clients)
    }

    addNewClient =  client => {
        return axios.post(`http://localhost:8080/clients`,client)
    }

    addClient = async (_id, name, surname, email, owner, country, firstContact, emailType, sold) => {
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
    
        const response = await this.addNewClient(client)
        // let client = new Client(iname, surname, email, owner, country)
        let clientStore = new Client(_id, name, surname, email, owner, country, new Date().toLocaleDateString(), emailType, sold)
        this.clients.push(clientStore)
    }


    updateClient = async (id, name, surname, country) => {
        let data = {name: name, surname: surname, country: country}
        let response = await axios.put(`http://localhost:8080/clients/${id}`, data)
        console.log(response)

        let client = this.clients.find(client => client.id === id)
        
        if(client){
            let index = this.clients.indexOf(client)
            client.first = name
            client.last = surname
            client.country = country 
            this.clients[index] = client
        }
    }

    updateSold = async id => {
        let data = {id: id}

        await axios.put(`http://localhost:8080/clientsSold`, data) 

        let client = this.clients.find(client => client.id === id)

        if(client)
            client.sold = !client.sold
    }

    updateOwner = async (id, owner) => {
        let data = {owner: owner}

        await axios.put(`http://localhost:8080/clientsOwner/${id}`, data)           

        let client = this.clients.find(client => client.id === id)

        if(client)
            client.owner = owner
    }

    updateEmailType = async (id, emailType) => {
        let data = {
            emailType: emailType,
            id: id
        }

        await axios.put(`http://localhost:8080/clientsEmailType`, data)

        let client = this.clients.find(client => client.id === id)

        if(client)
            client.email_type = emailType
    }

    get numClients(){
        return this.clients.length
    }
}