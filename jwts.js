const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "nmapscan.chinmaya.2007"
let users = [];

app.use(express.json());
//----------------------------------------------//
app.post("/signup",function (req,res){
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username:username,
    password:password,
  })
  res.json({
    
    message:"you're signed up " 
  })
})
//----------------------------------------------//
app.post("/signin",function (req,res){
  const username = req.body.username;
  const password = req.body.password;
  let foundUser = users.find(user => user.username===username && user.password===password)
  
  if (foundUser){
    const token = jwt.sign({
      username:username
    },JWT_SECRET);
     
    foundUser.token = token; 
    res.json({
      token:token
    })
  }else{
    res.status(403).send({
      message:"invalid username and password"
    })
  }
  console.log(users);
})
//----------------------------------------------//
app.get('/me',(req,res)=>{
  const token = req.headers.authorization;
  const decodedInformation = jwt.verify(token, JWT_SECRET); 
  const username = decodedInformation.username; 
  const user = users.find(u => u.username === username);
  if (user){
    res.send({
      username:user.username
    })
    console.log("authentication verified!!")

  }else{
    res.status(401).send({
      message:"unauthorised authentication io not applicable!!"
    })
  }
})
//----------------------------------------------//
app.listen(3000,()=>console.log("your server is running"));
