const express = require('express')
const router = express.Router()
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/registerModel')


router.post('/signup',(req,res,next) =>{
User.find({phoneNumber : req.body.phoneNumber, email : req.body.email}).exec().then(
  userExist =>{
    if (userExist.length >= 1) {
      return res.status(200).json({
        status : false,
        message : "User exist"
      })
    }else{
      bycrpt.hash(req.body.password, 10, (err, hash)=>{
           if (err) {
             return res.status(500).json({
               error: err
             })
           }else{
             const user = new User({
               fullName : req.body.fullName,
               email : req.body.email,
               password : hash,
               phoneNumber : req.body.phoneNumber
           })

           user.save().then(
             userResponse => {
               res.status(200).json({
                 message : "User created",
                 userDetails : userResponse,
                 status: true
               })
             }
           ).catch(
             err => {
               res.status(200).json({
                 error : err,
                 status: false
               })
             }
           )
         }
       })
    }
  }
  )
})

router.post('/login', (req,res,next)=>{
  User.find({ phoneNumber : req.body.phoneNumber}).exec().then(
    userFound =>{
      if (userFound < 1) {
        res.status(200).json({
          status: false,
          message : "No user found"
        })
      }
      bycrpt.compare(req.body.password, userFound[0].password,(err, response)=>{
        if (err) {
          res.status(200).json({
            error : err,
            status: false,
            message : "Incorrect Password"
          })
        }
        if (response) {
          //process.env.JWT_KEY
        const token = jwt.sign({
            email : userFound[0].email,
            phoneNumber : userFound[0].phoneNumber
          }, "key",
        {
          expiresIn: "1h"
        }
      )
          return res.status(200).json({
            status: true,
            token : token
          })
        } else{
          res.status(200).json({
            message : "Incorrect Password",
            status: false
          })
        }
        res.status(200).json({
          message : "Auth Failed",
          status : false
        })
      })
    }
  ).catch(
    err => {
      console.log(err)
      res.status(500).json({
        error : err
      })
    }
  )
})
router.get('/', (req, res, next)=>{
  User.find({}, (err, result)=>{
    if (err) {
      res.status(404).json({
        error: err
      })
    } else{
      res.status(200).json({
        users: result
      })
    }
  })
})

router.delete('/:userNumber', (req,res,next)=>{
  User.remove({phoneNumber : req.params.userNumber}).exec().then(
    deleteUser => {
      res.status(200).json({
        message : "User deleted",
        userDetails : deleteUser,
        status : true
      })
    }
  ).catch(
    err => {
      console.log(err)
      res.status(500).json({
        error : err,
        status: false
      })
    }
  )
})
module.exports = router;
