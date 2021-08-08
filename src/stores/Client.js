import { observable, makeObservable } from 'mobx'

export class Client {
    constructor(id, first, last, email, owner, country, date, emailType, sold ) {
        this.id = id
        this.first = first
        this.last = last
        this.email = email
        this.date =  date ?? null
        this.emailType = emailType ?? null 
        this.sold = sold ?? false
        this.owner = owner
        this.country = country
        
        makeObservable(this, {
            first: observable,
            last: observable,
            email: observable,
            emailType: observable,
            sold: observable,
            owner: observable,
            country: observable

        })

    }
}

