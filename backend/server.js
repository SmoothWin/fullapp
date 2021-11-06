require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 10
const mysqlCon = require('./dbConnection')
const express = require('express');
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
    

    mysqlCon.query({
        sql:'select * from user',
        timeout: 10000
    }, (err, result, fields)=>{
        if(err) throw err;
        res.send(result);
    })
})
app.post('/', async (req, res)=>{
    let username = req.body.username
    let email = req.body.email
    let password = await bcrypt.hash(req.body.password, saltRounds);
    mysqlCon.query({
        sql:'INSERT INTO user (username, email, password) VALUES (?,?,?)',
        timeout: 10000
    },[username, email, password], (err, result, fields)=>{
        
        let response;
        let status;

        if(err){ 
            status = 403;
            response = err.message;
        }else{
            status = 201;
            response = {"username":username, "email":email, "password":password};
        }
        
        res.status(status).send(response);
    })

})

app.listen(port, ()=>{
    console.log(`Example app listening on localhost:${port}`)
})