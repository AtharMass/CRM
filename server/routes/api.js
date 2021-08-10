const express = require('express')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/sql_crm')

const router = express.Router()

router.get('/clients', function (request, response) {
    let {offset} = request.query
    let limit = 20
    
    sequelize
    .query(`SELECT client.*, country.country, owner.owner, email_type.email_type
            FROM client JOIN country ON country.id =  client.country_id
            JOIN owner ON  owner.id =  client.owner_id 
            LEFT JOIN email_type ON email_type.id = client.email_type_id 
            ORDER BY client.id LIMIT ${limit} OFFSET ${!offset ? 0: (offset-1)*limit}`)
    .then(function ([result]) {
        response.send(result)
    }) 
})

router.get('/countries', function (req, res) {
    sequelize
    .query(`SELECT * FROM country`)
    .then(function ([result]) {
        res.send(result)
    }) 
})

router.get('/owners', function (req, res) {
    sequelize
    .query(`SELECT * FROM owner`)
    .then(function ([result]) {
        res.send(result)
    }) 
})

router.put('/clients/:id', async function (request, response) {
    let data = request.body
    let { id } = request.params
 
    let result = {code: 400, message: "Failed"}
    let country = await findByID('country', 'country', data.country)

    sequelize
    .query(`UPDATE client SET 
            first = '${data.name}', 
            last = '${data.surname}', 
            country_id = ${country} 
            WHERE id = ${id}`)
    .then(function (data) {
        result.code = 200
        result.client = {first: data.name, last: data.surname, country: country }
        result.message = "The client successfuly updated"
        console.log(data)
    }) 

    response.send(result) 

    // if (updateObj.ok === 1) {
    //     result.code = 200
    //     result.msg = 'Your Data has been successfuly updated'
    // } else {
    //     result.code = 442
    //     result.msg = 'Faield to update your data'
    // }
})

router.put('/clientsOwner/:id', async function (request, response) {
    let data = request.body
    let { id } = request.params
 
    let result = {code: 400, message: "Failed"}
    let owner = await findByID('owner', 'owner', data.owner)

    sequelize
    .query(`UPDATE client SET 
            owner_id = ${owner} 
            WHERE id = ${id}`)
    .then(function (data) {
        result.code = 200
        result.message = "The client successfuly updated"
    }) 

    response.send(result) 
}) 

router.put('/clientsEmailType', async function (request, response) {
    let data = request.body
 
    let result = {code: 400, message: "Failed"}
    
    let email = await findByID('email_type', 'email_type', data.emailType)


    sequelize
    .query(`UPDATE client SET 
            email_type_id = ${email} 
            WHERE id = ${data.id}`)
    .then(function (data) {

        result.code = 200
        result.message = "The client successfuly updated"
        response.send(result) 
    }) 

})

router.put('/clientsSold', async function (request, response) {
    let data = request.body
 
    let result = {code: 400, message: "Failed"}
    
    sequelize
    .query(`UPDATE client SET 
            sold= true
            WHERE id = ${data.id}`)
    .then(function (data) {

        result.code = 200
        result.message = "The client successfuly updated"
        response.send(result) 
    }) 

})

const findByID = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = "${value}"`
    let results = await sequelize.query(query)

    return results[0][0].id
}

router.post('/clients', async function (request, response) {
    let data = request.body
    let result = {code: 400, message: "The client was not added"}
    
    let owner = await findByID('owner', 'owner', data.owner)
    let country = await findByID('country', 'country', data.country)

    sequelize
    .query(`INSERT INTO client
    VALUES (null, '${data.first}', '${data.last}', '${data.email}', ${data.sold}, 
            '${ new Date().toLocaleDateString()}', ${data.emailType}, ${owner}, ${country})`)
    .then(function (data) {
        result.code = 200
        result.message = "The client inserted successfuly"
        // response.client = 
        response.send(result) 
    }) 
   
})

router.get('/newClients', async function (request, response) {
    let {month,year} =  request.query

    let months = await sequelize.query(` SELECT count(client.date) AS COUNT
                                         FROM client
                  
                                   WHERE (date >= '${month}/1/${year}' AND date<= '${month}/31/${year}')`);
    let result = {data: months[0][0].COUNT}
    response.send(result)
    // sequelize
    // .query(`SELECT * 
    //         FROM client`)
    // .then(function ([result]) {
    //     response.send(result)
    // }) 
})

// router.post('/transaction', function (request, response) {
//     let data = request.body
//     let result = {}

//     let newTrans = new Transaction({
//         amount: Number(data.amount),
//         vendor: data.vendor,
//         category: data.category
//     })

//     if (data.vendor !== '' && data.amount !== '' && data.category !== '') {
//         const savePromise = newTrans.save()
//         savePromise.then(saved => {
          
//         }).catch(err => {
//             console.log(err)
//         })
//         result.code = 200
//         result.transaction = newTrans
//         result.message = "The data inserted successfuly"
        
//     } else {
//         result.code = 422
//         result.message = "All fields are required"
//     }
    
//     response.send( result)
// })

// router.delete('/transaction', function (request, response) {
//     let {id} = request.query
//     let result = {}
//     console.log(id)
//     Transaction.deleteOne({ _id: id })
//         .exec((err, success) => {
//             if (success === null) {
//                 result.code = 404
//                 result.message = "Sorry, we could not find the transaction"
//             } else {
//                 if ( success.deletedCount === 1){
//                     result.code = 200
//                     result.message = "The transaction was successfully deleted"
//                 }else{
//                     result.code = 304
//                     result.message = "The transaction has already been deleted"
//                 }
//             }
//             console.log(result);
            
//             response.send(result)
//         })
// })

// router.get('/transactions/categories', function (req, res) {
//     const aggregate = [
//         {
//             "$group":{
//                 "_id" : "$category",
//                 "total": { 
//                     "$sum": "$amount" 
//                 } 
//             }
//         }
//     ]

//     Transaction.aggregate(aggregate)
//                 .exec(function (err, result){
//                     if(err){
//                         console.log(err)
//                         return;
//                     }
//                     res.send(result)
//             });
// })


module.exports = router