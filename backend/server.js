const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Posts = require('./post.js');
const Users = require('./user.js');
const bcrypt = require('bcrypt');

 mongoose.connect('mongodb://127.0.0.1:27017/blogs')
 .then(()=>{ console.log('db connected'); })
 .catch((err)=>{ console.log(err); })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.get('/posts', async (req,res)=>{
    try{
        const post = await Posts.find().sort({CreatedAt: -1});
        res.send(post);
    }catch(err){
       res.json(err);
    }
})

app.get('/posts/:id', async (req,res)=>{
    try{
        const post = await Posts.findById(req.params.id);
        res.send(post);
    }catch(err){
        res.status(400).send(err);
    }
})

app.get('/myblogs/:id', async(req,res)=>{
    try{
        const post = await Posts.find({ userId:req.params.id }).sort({CreatedAt: -1});
        res.json(post);
    }catch(err){
        res.json(err);
    }
})

app.post('/posts', async (req,res)=>{
    const post = new Posts(req.body);
    await post.save()
    .then(()=>{ res.send('user saved successfully'); })
    .catch((err)=>{ res.send(err); })
})

app.put('/posts/:id', async (req,res)=>{
    const post = await Posts.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then(()=>{ res.send('post updated'); })
    .catch(err=>{ res.send(err); })
})

app.delete('/posts/:id', async (req,res)=>{
    await Posts.findByIdAndDelete({_id:req.params.id})
    .then(()=>{ res.status(200).send('deleted successfull'); })
    .catch(err=>{ res.status(400).send(err); })
})

app.post('/register', async (req,res)=>{
        //  //check if email exists
        const isExist = await Users.findOne({ Email: req.body.Email });
        if(isExist) { return res.status(400).send('This email is already exist'); }

        //hash the password
        const hashpassword = await bcrypt.hash(req.body.Password,10);
        const user = new Users({
            "Name":req.body.Name,
            Email: req.body.Email,
            Password: hashpassword
        });

        await user.save()
        .then(()=>{ res.send('user saved successfully'); })
        .catch((err)=>{ res.status(400).send(err); })
})

app.get('/users',async (req,res)=>{
    await Users.find()
    .then((user)=>{ res.send(user); })
    .catch((err)=>{ res.status(400).send(err); })
})

app.post('/login', async (req,res)=>{
        //check if email exists
        await Users.findOne({ Email: req.body.Email })
        .then(async (user)=>{
            //compare the hashed password and password entered
            const checked = await bcrypt.compare(req.body.Password, user.Password);
            if(!checked){ 
                return res.status(400).send('password does not match');
            }
            res.status(200).send(user._id);
        })
        .catch((err)=>{ res.status(404).send("This email does not exist"); })
})

app.post('/forget-password', async(req,res)=>{
    const password = await bcrypt.hash(req.body.Password,10);
    const user = await Users.findOneAndUpdate(
        { Email: req.body.Email },
        { Password: password },
        { new: true }
    );

    if(!user){
      return  res.status(400).send('user with this email does not exist!');
    }
    return res.status(200).send('password updated successfully!');
})

app.listen(5000, ()=>{ console.log('server running'); })