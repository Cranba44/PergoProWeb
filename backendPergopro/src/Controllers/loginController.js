const userModel = require('../Models/userModel');
const bcrypt= require('bcrypt');
const {generateToken}= require('../Utils/generateToken');
const replaceTemplateEmail = require('../Utils/replaceTemplateEmail');
const { emailSignupTemplate } = require('../Templates/template');
const { sendMail } = require('../Services/emailService');

//Funcion para hacer login una vez que tiene acceso
const login = async (req,res) => {
    try {
        const  {email, password} = req.body;
        const user= await userModel.findOne({email: email});
        console.log(user)
        if(!user) {
            console.log("no found usuario")
            return res
            .status(401)
            .json({ status: 'Failed', message: "Email & password doesn't match"})
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword, "ole ole")
        if(!validPassword) {
            return res.status(401).json({
                status: 'Failed',
                message: "Email & password doesn't match"
            });
        }

        const payload = {
            _id: user._id,
            email: user.email,
        }
        console.log(payload)
        const token= generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        res.status(200).json({
            stauts:'Succeded',
            user: user, 
            token,
            token_refresh
        })
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
        
    }
}

//funcion para registrarse como nuevo usuario

const signUp = async (req,res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 4);
        const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: password,
        birthdate: req.body.birthdate
        })

        await user.save();
        console.log(user)
        //funcion para mandarme el email de bienvenida
        const usersTemplate = {
            firstName:user.firstName,
            lastName: user.lastName,
            username: user.username,
            my_company: 'PergoPro',
            company_address: 'Calle Granada,1, Rincon de la Victoria',
            email: user.email,
        }

        const subject = `Many thanks for the support to our community ${usersTemplate.firstName}`;
        const html = replaceTemplateEmail(emailSignupTemplate, usersTemplate);

        await sendMail(user.email, subject, html);
        res.status(201).json({ status: 'Succeded', user: user})
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
        
    }
}


const getRefreshToken = async (req,res) => {
    try {
        if(!req.payload) {
            return res.status(401).json({
                status: "Failed",
                message: 'Acces denied'
            })
        }
        const payload = {
            _id:req.payload._id,
            username: req.payload.username,
            email: req.payload.email,
        }
        const token= generateToken(payload, false);
        const token_refresh= generateToken(payload, true);
        res.status(200).json({ status: 'Succeded', token, token_refresh})
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
    }
}

const getAllUsers = async (req,res) => {
    try {
        const users= await userModel.find();

        if(users.length === 0) {
            return res.status(200).json({
                status: 'Succeded',
                error: 'No users to show'
            });
        }
            res.status(200).json({
                status: 'Succeded',
                users: users
            })
        
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
        
    }
}
const updateUser = async (req,res) => {
    const {id} = req.params;
    try {
        const newParams = req.body;
        const userModified = await userModel.findByIdAndUpdate(id, newParams, {new:true});

        if(!userModified) {
            return res
            .status(200)
            .json({status:'Succeded', error: 'User not found with that id'})
        }

          res.status(200).json({status:'Succeded', user: userModified})
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
    }
  }

  const deleteUser = async (req,res) => {
      const {id} = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user) {
            return res
            .status(200)
            .json({ status: 'Succeded', error: 'User not found with that id'})
        }
        res.status(200).json({status:'Succeded', user:user});
    } catch (error) {
    res.status(404).json({ status: "Failed", error: error.message });
    }
  }
  
  const getUserById = async (req,res) => {
      const {id} = req.params;
    try {
        const user = await userModel.findById(id)
        if(!user) {
            return res.status(200).json({
                status: 'Succeded',
                message: "There's no user with that id"
            });
        }
        res.status(200).json({ status: 'Succeded', user: user})
    } catch (error) {
        return res.status(404).json({ status: "Failed", error: error.message });
    }
}

module.exports = {login, signUp, getRefreshToken, getAllUsers, updateUser, deleteUser, getUserById}