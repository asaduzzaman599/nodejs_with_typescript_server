import express,{ Express, Request, Response } from  'express';
import dotenv from 'dotenv'
import cors from 'cors';

import { MongoClient, ServerApiVersion } from 'mongodb';
import { runMain } from 'module';

const app:Express = express();
const PORT:string|number =   process.env.PORT||5000;
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

//mongoDB
const option =  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yuwrq.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client:MongoClient = new MongoClient(uri,option);


const run = async ()=>{
    try{
       await client.connect()
        console.log("db connected")
    }finally{
        
    }
}
run().catch(console.dir)

app.get('/',(req:Request,res:Response):void=>{
    res.send(`server running port: ${PORT}`)
})

app.listen(PORT,():void=>{
    console.log(`server running port: ${PORT}`)
})

