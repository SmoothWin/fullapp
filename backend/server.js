require('dotenv').config()
const mysqlCon = require('./dbConnection')
const express = require('express');
const app = express()
const port = process.env.PORT || 3000;



app.use('/',(req,res,next)=>{
    mysqlCon.connect(function(err){
        if(err) throw err;
        console.log(`Connected to sql DB`)
    });
    next()
})

app.get('/',(req,res)=>{
    
    let list = null;
    mysqlCon.query({
        sql:'select * from user',
        timeout: 10000
    }, (err, result, fields)=>{
        if(err) throw err;
        list = result;
    })
    mysqlCon.end(()=>{
        console.log(`Closed connection to sql DB`)
    })
    res.send(list);
})

app.listen(port, ()=>{
    console.log(`Example app listening on localhost:${port}`)
})