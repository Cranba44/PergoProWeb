const express = require('express')
const productRoutes = require('./src/Routes/productRoutes')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const loginRoutes = require ('./src/Routes/loginRoutes')
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/login",loginRoutes)

const url_mongodb = process.env.DATA_URL_MONGO
mongoose.connect(url_mongodb)
const db= mongoose.connection

db.on("error", (error) => {
    console.error("ERROR AL CONECTAR");
  });
  
  db.once("connected", () => {
    console.log("MONGO CONECTADO");
  });
  
  db.on("disconnected", () => {
    console.log("MONGO DESCONECTADO");
  });

  app.use('/products', productRoutes)

const PORT = process.env.PORT  || 3000 

app.listen(PORT, () => {
    console.log(`Servidor en puerto: ${PORT}`)
    
})

module.exports = app