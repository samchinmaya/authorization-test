const express = require("express");
const app = express();
app.use(express.json());
let users = [];
function newToken(){
  const options = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let token = '';
  for (let i = 0;i<32;i++){
    token = token + options[Math.floor(Math.random()*options.length)];
  }

  return token;
}
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
app.get('/me',(req,res)=>{
  const token = req.headers.authorization;
  const user = users.find(user => user.token === token);
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
app.post("/signin",function (req,res){
  const username = req.body.username;
  const password = req.body.password;
  let foundUser = null;
  for (let i = 0; i<users.length;i++){
    if(users[i].username === username && users[i].password === password){
      foundUser = users[i]
    }
  }
  if (foundUser){
    const token = newToken();
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
app.listen(3000,()=>console.log("your server is running"));
