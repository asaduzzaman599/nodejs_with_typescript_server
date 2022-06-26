import express,{ Express, Request, Response } from  'express';
import dotenv from 'dotenv'
import cors from 'cors';

import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { runMain } from 'module';
import { Post } from './Model/Post';

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
        const postCollection = client.db('post_book').collection('post')

        app.get('/post',async (req:Request,res:Response):Promise<void>=>{
            const result =await postCollection.find().toArray()
            res.send(result)
        })
        app.post('/post',async (req:Request,res:Response):Promise<void>=>{
            const post:Post = req.body
            const result =await postCollection.insertOne(post)
            res.send(result)
        })
        
        app.patch('/post/:id',async (req:Request,res:Response):Promise<void>=>{
            const post:Post = req.body
            const id:string = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const updateDoc = {
                $set:post
            }
            const result =await postCollection.updateOne(filter,updateDoc)
            res.send(result)
        })
        
        app.delete('/post/:id',async (req:Request,res:Response):Promise<void>=>{
            const id:string = req.params.id
            const filter = {
                _id:new ObjectId(id)
            }
            const result =await postCollection.deleteOne(filter)
            res.send(result)
        })
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

