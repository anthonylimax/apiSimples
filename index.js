import express from 'express';
import cors from 'cors';

const server = express();
let response = {};
server.use(express.json())
server.use(cors())
server.get("/", (req, res)=>{
    res.send("OLA MUNDO!")
})
server.post('/connect', ({body}, res)=>{
    res.send("yeah")
})


server.listen(process.env.PORT ||8000)