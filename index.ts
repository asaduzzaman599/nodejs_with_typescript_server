import express,{ Express, Request, Response } from  'express';
import dotenv from 'dotenv'
import cors from 'cors';

const app:Express = express();
const PORT:string|number =   process.env.PORT||5000;

//middleware
app.use(cors())
app.use(express.json())

app.get('/',(req:Request,res:Response):void=>{
    res.send(`server running port: ${PORT}`)
})

app.listen(PORT,():void=>{
    console.log(`server running port: ${PORT}`)
})

