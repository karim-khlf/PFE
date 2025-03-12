const app = require('./app')
const express = require('express')
const mysql = require ('mysql2')
const dotenv = require ('dotenv')
const {sequelize} = require('./models')
const db = require('./models/index.js')
dotenv.config()

port=3000
db.sequelize.sync({alter:true }).then((req)=>{
    console.log("SYNC IS DONE...")
  }).catch(error=>(
    console.log('SYNC ERROR',error.stack)
  ))
    app.listen(port,()=>{
        console.log(`listening to http://localhost:${port}`)
    })
    

