const express = require("express")
const connectDB =require("./config/db")
const dns = require("dns")
const dotenv = require("dotenv")
const courseRoute = require("./routes/courseRoutes")
const authRoute = require("./routes/authRoutes")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])



app.get("/welcome",(req,res)=>{
    res.send("welcome back")
})
app.use("/api/auth",authRoute)
app.use("/api/courses",courseRoute)
connectDB()

app.listen(3000,()=>{
    console.log("listening to the PORT")
})