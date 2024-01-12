const express = require('express');
const app = express();
const port = 5000; // You can use any port you prefer
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { TodoSchema }  = require('./verify');
const { Todomodel } = require('./monogoconnect');

app.get('/todos',async(req,res)=>{
    const all=await Todomodel.find();
    res.send(all) 
})
app.post('/create',async(req,res)=>{
   const { title, description } = req.body;
   const c=TodoSchema.safeParse({title,description})
   if(c.success)
   {
       const v=new Todomodel({
         title,description,completed:false,
       })
       await v.save()
       res.send("creation complete")
   }
   else
   {
    res.send("pls send correct title and description")
   }
})
app.delete('/remove',async(req,res)=>{
   const a=req.body.id;
   const deletedTodo =await Todomodel.findOneAndDelete({ _id: a });
   if(deletedTodo)res.send("deleted todo");
   else res.send("error occured pls send correct id")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  