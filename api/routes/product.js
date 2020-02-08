const express = require('express')
const router = express.Router()
const Product = require('../models/productmodel')
const mongoose = require('mongoose')
const multer = require('multer')

const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './uploads/')
  },
  filename : function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }else {
    cb(null, false)
  }
}
const upload = multer({ storage: storage , limits: {
  fileSize: 1024 * 1024 * 5
},
 fileFilter : fileFilter})
const checkAuth = require('../middleware/check-auth')
//
router.get('/', (req, res, next)=>{

Product.find({}, (err, result)=> {
  if(err)
    return err;
  res.status(200).send(result);
})
// Product.find().exe().then(
//   docs => {
//   const response = {
//     count : docs.length,
//     products : docs.map(doc => {
//       return {
//         name : docs.name,
//         price: docs.price,
//         _id : docs._id
//       }
//     })
//   }
//
//     if (docs >=0) {
//         res.status(200).json(response)
//     }else{
//       res.status(404).json({
//         message : "No product Found"
//       })
//     }
//
//   }
// ).catch( error => {
//   console.log(error)
//   res.status(500).json({
//     error : error
//     })
//   })
})
//route to create goods
router.post('/', upload.single('productImage'), (req, res,next)=>{
  console.log(req.file)
  const productObject = new Product({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    price : req.body.price,
    heading : req.body.heading,
    categories : req.body.categories,
   productImage : req.file.path
  })
  productObject.save().then(result => {
    console.log(result)
    res.status(201).json({
      message : "Product created",
      createdProduct : {
        name: result.name,
        price : result.price,
        heading : result.heading,
        categories : result.categories,
      productImage : result.productImage,
        _id : result._id
      }
    })
  }).catch( error => {console.log(error)
      res.status(500).json({
        error : error
      })
  })
})


router.get('/:productId',(req,res,next)=>{
  const id = req.params.productId
  Product.findById(id).select('name price _id productImage').exec().then(
    docs => {
      console.log(docs)
      if (docs) {
          res.status(200).json({
            product: docs
          })
      }else {
        res.status(404).json({
          message : "No valid entry found for the ID"
        })
      }

    }
  ).catch(
    error => {
      console.log(error)
      res.status(500).json({error:error})
    }
  )
})

router.patch('/:productId',(req,res,next)=>{
  const id =  req.params.productId
  const UpdateOps = {}
  //it gets an JsonArray of format
  // [{propName: "objectName",value: "newValue"}]
  for(const ops of req.body){
    UpdateOps[ops.propName] = ops.value
  }
  Product.update({_id : id}, { $set: UpdateOps}).exec().then(
    result => {
      console.log(result)
      res.status(200).json({
        message : "Product updated",
        product : result
      })
    }
  ).catch(
    err =>{
      console.log(err)
      res.status(500).json({
        error:err
      })
    }
  )
})

router.delete('/:productId',(req,res,next)=>{
  const id = req.params.productId
  Product.remove({_id : id}).exec().then(
    result => {

      res.status(200).json({
      message: "Product deleted",
      product: result
    })
    }
  ).catch(
    error => {
      console.log(error)
      res.status(500).json({
        error : error
      })
    }
  )
})

module.exports = router;
