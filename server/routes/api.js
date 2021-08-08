const express = require('express')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/sql_crm')

const router = express.Router()

router.get('/clients', function (request, response) {
    let {offset} = request.query
    let limit = 20
    console.log(request.query)
    sequelize
    .query(`SELECT client.*, country.country, owner.owner 
            FROM client JOIN country JOIN owner
            WHERE country.id =  client.country_id
            AND owner.id =  client.owner_id
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
    console.log(id," from api")
    console.log(data.name)
    console.log(data.country)
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
        console.log(data)
        response.send(result) 
    }) 
   
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