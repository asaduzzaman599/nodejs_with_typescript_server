"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//mongoDB
const option = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb_1.ServerApiVersion.v1 };
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yuwrq.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new mongodb_1.MongoClient(uri, option);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("db connected");
        const postCollection = client.db('post_book').collection('post');
        app.get('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield postCollection.find().toArray();
            res.send(result);
        }));
    }
    finally {
    }
});
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send(`server running port: ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`server running port: ${PORT}`);
});
