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
            numClients: computed
        })
    }

    storeClient = (clients) => {
       this.clients = [...clients]
    }

    addClient = (_id, name, surname, email, owner, country, firstContact, emailType, sold) => {
        let client = new Client(_id, name, surname, email, owner, country, firstContact, emailType, sold)
        this.clients.push(client)
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

    updateSold = id => {
        let client = this.clients.find(client => client._id === id)

        if(client)
            client.sold = !client.sold
    }

    updateOwner = (id, owner) => {
        let client = this.clients.find(client => client._id === id)

        if(client)
            client.owner = owner
    }

    updateEmailType = (id, emailType) => {
        let client = this.clients.find(client => client._id === id)

        if(client)
            client.emailType = emailType
    }

    get numClients(){
        return this.clients.length
    }
}