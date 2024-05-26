import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";
import { jwt } from 'jsonwebtoken'


export async function register(req,res) {
     try {
        const { username , password , email, profile } = req.body;

        const existUsername = new promise ((resolve, reject) => {
            UserModel.findOne({username}, function (err,user) {
                if(err) reject (new Error(err))
                if(user) reject ({error : "please provide a unique username"});

                resolve();
            })
        });

        const existEmail = new promise ((resolve, reject) => {
            UserModel.findOne({email}, function (err,email) {
                if(err) reject (new Error(err))
                if(email) reject ({error : "please provide a unique email"});

                resolve();
            })
        });

        Promise.all([existUsername,existEmail])
          .then(() => {
                  if(password) {
                     bcrypt.hash(password, 10 )
                       .then (hashedPassword => {
                        const user = new UserModel({
                            username, 
                            password : hashedPassword,
                            profile : profile,
                            email
                        });

                        user.save()
                        .then(result => res.status(201).send({msg : " user registered sucessfully "}))
                        .catch(error => res.status(500).send({error}))
                       } )
                  }
          }).catch(error => {
            return res.status(500).send({
                error : "enable to hashed password"
            })
          })
    
     }catch(error) {
        return res.status(500).send(error);
     }
}

export async function login(req,res) {
     
    const [ username, password ] = req.body; 

    try {
        UserModel.findOne({ username })
        .then( user => {
            bcrypt.compare(password, username.password)
            .then( passwordCheck => {
                
                if(!passwordCheck) return res.status(400).send({error: "don't have the password"})

                const token =jwt.sign({
                    userId: user._id,
                    username : user.username 
                },'secret',{expiresIn : "24h"});

                return res.token(200).send({
                    msg :"login sucessfully..!",
                    username : user.username,
                    token
                })
            })
            .catch(error => {
                return res.status(400).send({error : "password does not match "})
            }
            )
        }
        )
        .catch(error => {
            return res.status(404).send({error : "username not found"})
        }) 
       
    } catch(error) {
        return res.status(500).send({error});
    }
}

export async function getUser(req,res) {
    res.json('getuser route')
}

export async function updateUser(req,res) {
    res.json('updateUser route')
}

export async function generateOTP(req,res) {
    res.json('generateOTP route')
}

export async function verifyOTP(req,res) {
    res.json('verifyOTP route')
}

export async function createResetSession(req,res) {
    res.json('createResetSession route')
}

export async function resetPassword(req,res) {
    res.json('resetPassword route')
}


