import express from "express"
import morgan from "morgan";
import cors from "cors";
import zod from "zod";
import {client} from "@repo/db/client"

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const SignupSchema = zod.object({
    username: zod.string().min(4).max(20),
    password: zod.string().min(5).max(32)
})

app.get('/',(req,res)=>{
    res.send("hello world !")
})

app.post('/signup',async(req:any,res:any)=>{
    try{
        const {success} = SignupSchema.safeParse(req.body);
        if(!success){
            return res.status(404).json({
                message:"Invalid Inputs Provided"
            })
        }
        const {username,password} = req.body;
        const response =await client.user.findFirst({
            where:{
                username
            }
        })
        if(response){
            return res.status(400).json({
                message:"Username Already Exists, Please Change Username"
            })
        }
        const resp = await client.user.create({
            data:{
                username,password
            }
        })
        return res.status(200).json({message:"User Successfully Created",id:resp.id})
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message:"Internal Error Occured"
        })
    }
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}/`)
})