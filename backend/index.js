const express = require('express');
require("dotenv").config();
const {connection} = require("./config/db");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/",(req, res)=>{
    res.send("welcome to home page")
})
app.post("/signup",(req, res)=>{
    
})


app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log("server connected");
        console.log(`server runnig http://localhost:${PORT}`)
    } catch (error) {
        console.log("server not connr=ected", error);
    }
    
})