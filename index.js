import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const server = express();
let response = {};
server.use(cors());
server.use(express.json())
const db = mysql.createConnection(process.env.URL)

server.post('/connect', ({body}, res)=>{
    let total = 0;
    db.query("select * from perfil", (err, resQuery, field)=>{
        response = resQuery.find(profile => profile.email == body.emailClient && profile.pass == body.passwordClient)

        if(response == undefined){
            res.send(false)
            
        }
        else{
            db.query(`select distinct c.numberOfItens, i.nomeItem, i.price, i.picture from perfil as p join carrinho as c on c.id_profile = ${response.id_Carrinho} join items as i on c.id_item = i.id`, (error, resp, field)=>{
                resp.forEach(element => {
                    total += +element.price * element.numberOfItens;
                })
                response =  {...response, total: total.toFixed(2),carrinho: resp}
                res.json(response)
           })
        }
    })
})


server.listen(process.env.PORT ||8000)