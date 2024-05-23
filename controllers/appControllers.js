import UserModel from "../model/User.model.js"


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
       
    
     }catch(error) {
        return res.status(500).send(error);
     }
}

export async function login(req,res) {
    res.json('login route')
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


