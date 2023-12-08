import express, { response } from 'express';
import mongoose from 'mongoose'
import { MachineDetails } from './Dbfile.js';
import cors from 'cors'

const app=express();
app.use(cors())

app.use(express.json());

const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1/plant-monitoring-system',); 
        console.log("connected to database...!");
    } catch(error){
        console.log("Error db not connected");
    }
}

// app.get("/hello",async(request,response)=>{
//     try{
//         response.send("Hello Pratik");
//     } catch(error){
//         response.send(error)
//     }
// })

app.post("/machine",async(request,response)=>{
    try{
        const reqData=request.body;
        const Details = new MachineDetails(reqData);
        await Details.save();
        response.send({message:'Details Inserted'})
    } catch(error){
        response.send({message:"Something went wrong..!"});
    }
})

app.get("/machine",async(request,response)=>{
    try{
        const Details = await MachineDetails.find();
        response.send({Details:Details});
    } catch(error){
        response.send({message:'Something went wrong..!'});
    }
})

app.get("/reads/:machno",async(request,response)=>{
    try{
        const Details = await MachineDetails.findOne({machno:request.params.machno});
        if(Details==null){
            response.send({message:"Details Not Found"});
        }
        else{
            response.send({Details:Details});
        }
    } catch(error){
        response.send({message:'Something went wrong'});
    }
})

app.delete("/machine/:machno",async(request,response)=>{
    try{
        await MachineDetails.deleteOne({machno:request.params.machno});
        response.send({message:'Student deleted'});
    } catch(error){
        response.send({message:'something went wrong...!'})
    }
})

app.put("/puts/:machno",async(request,response)=>{
    try{
        await MachineDetails.updateOne({machno:request.params.machno},request.body);
        response.send({message:"ok updated"})
    } catch(error){
        response.send('something went again wrong')
    }
})


app.listen(4900,()=>{
    console.log('Server is running on port 4900');
    connectDb();
});