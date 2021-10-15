const User = require('../model/UserModel');
const mongoose = require("mongoose");
const {registerValidation} = require('../validator')



exports.register = async (req, res, next) => {
    
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
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

  
