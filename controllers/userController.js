const User = require('../model/UserModel');
const mongoose = require("mongoose");
const {registerValidation,loginValidation} = require('../validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const checkEmail = await User.find({
        email: req.body.email,
      }).exec()
      if(checkEmail) res.status(400).send("Email already Exist")
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          try {
            console.log(req.body)
              const  savedUser = await user.save()
              .then(result =>{
                res.send(result)
              })
          } catch (error) {
              res.status(400).send(error)
          }
  }

  exports.user_create = async (req, res, next) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    User.find({
        email: req.body.email,
      }).exec()
      .then(findResult => {
          if (findResult.length > 0) {
              console.log(findResult)
            res.status(400).send(findResult)
          } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
              });
              user.save()
                .then(result => {
                  console.log(result);
                  res.status(201).send(result)
                //   .json({
                //     message: "User registered",
                //   });
                })
          }

  
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err)
      });
  }

  exports.user_login = async (req, res, next) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    User.find({
        email: req.body.email,
      }).exec()
      .then(async findResult => {
          if (findResult.length < 0) {
              console.log(findResult)
            res.status(400).send("email not exist")
          } else {
              const checkPassword = await bcrypt.compare(req.body.password, findResult[0].password)
              if(checkPassword){
                  const token = jwt.sign({_id: findResult[0]._id},"gkuybbghashafafgyb")
                  res.header('auth-token',token).send(token)
              } else{
                res.send("username or passsword error")
              }
              
          }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err)
      });
  }

  exports.test = async (req, res, next) => {
    res.send("username or passsword error")
  }