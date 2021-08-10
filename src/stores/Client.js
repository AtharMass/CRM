import { observable, makeObservable } from 'mobx'

export class Client {
    constructor(id, first, last, email, owner, country, date, emailType, sold ) {
        this.id = id
        this.first = first
        this.last = last
        this.email = email
        this.date =  date ?? null
        this.email_type = emailType ?? null 
        this.sold = sold ?? false
        this.owner = owner || "Emily Durham"
        this.country = country || "Albania"
        
        makeObservable(this, {
            first: observable,
            last: observable,
            email: observable,
            email_type: observable,
            sold: observable,
            owner: observable,
            country: observable

        })

    }
}

