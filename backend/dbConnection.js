require('dotenv').config()
const mysql = require('mysql')
const con = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_SECRET,
    database:process.env.DB_DB
})

con.connect(function(err){
    if(err) throw err;
    console.log(`Connected to sql DB`)
});
// const con = mysql.createConnection("mysql://fullstackapp:password123@localhost:3308/user");

module.exports = con;