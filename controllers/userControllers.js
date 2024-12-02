import User from  '../models/user.js'
import jwt from 'jsonwebtoken'

export function postUsers(req,res){

  const user = req.body

  const newUser = new User(user)
  newUser.save().then(
    ()=>{
      res.json({
        message : "User created successfully"
      })
    }
  ).catch(
    ()=>{
      res.json({
        message : "User creation failed"
      })
    }
  )
}

//------------Login--------------
export function loginUser(req,res){
  const credentials = req.body

  User.findOne({email : credentials.email, password :credentials.password}).then(
    (user)=>{
      if(user == null){
        res.status(403).json({
          message : "User not found"
        })
      
      }else{
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "48h" });

        res.json({
          message : "User found",
          user : user,
          token : token
        })
      }
    }
  )
}
//------Sign In Function---------
export function loginUsers(req,res){          
  const credentials = req.body

  User.findOne({email: credentials.email}).then(
      (user)=>{
          if(!user){
              res.status(403).json({
                  message: "User not found"
              })
          }else{
              const isPasswordValid = bcrypt.compareSync(credentials.password, user.password)
              
              if(!isPasswordValid){
                  res.status(403).json({
                      message: "Incorrect Password"
                  })
              }else{
                  const payload = {
                      id: user._id,
                      email: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      type: user.type
                  };

                  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "48h"});   //asign user information to the "token" , "secret" is the password
              
                  res.json({
                      message: "User found",
                      user: user,
                      token: token   //send the token to the frontend
                  })
              }
          }
      }
  )
}

//-----Admin checking------------
export function isAdminValid(req){
  if(req.user == null){
      return false
  }
  if(req.user.type != "Admin"){
      return false
  }
  return true
}

//-----Customer checking-----------
export function isCustomerValid(req){
  if(req.user == null){
      return false
  }
  if(req.user.type != "Customer"){
      return false
  }
  return true
}

export function getUser(req, res){
  const user = req.body.user
  if(user == null){
      res.json({
          message: "not found"
      })
  }else{
      res.json({
          message: "found",
          user: user
      })
  }
}
        



