import { Router } from "express";

const router = Router();

import * as controller from "../controllers/appControllers.js"


//post methods
router.route('/register').post(controller.register); //register user
//router.route('/registerMail').post(); //send the email
router.route('/authenticate').post((req,res) => res.end()); //authenticate user 
router.route('/login').post(controller.login); //login in app


//get methods

router.route('/user/:username').get(controller.getUser); // user with username 
router.route('/generateOTP').get(controller.generateOTP); // generate random otp 
router.route('/verifyOTP').get(controller.verifyOTP); // verify otp 
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

//get methods 

router.route('/updateuser').put(controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword );// use to reset the password 



export default router;