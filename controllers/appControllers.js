import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import ENV from '../config.js'


export async function register(req,res) {
     try {
        const { username , password , email, profile } = req.body;

        const existUsername = await  UserModel.findOne({username})

        const existEmail = await UserModel.findOne({email})

       if(existUsername) return res.status(400).send({error : "username already exist"})
        if(password) {
            let hashedPassword = await bcrypt.hash(password, 10 )
            console.log(hashedPassword)
            const user = new UserModel({
                username, 
                password : hashedPassword,
                profile : profile,
                email
            });

            await user.save()
            res.json(user)
            return
        }
        res.json("👎")
     }catch(error) {
        console.log(error.message)
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
                },ENV.JWT_SECRET,{expiresIn : "24h"});

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


