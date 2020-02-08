const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/orderModel')
const Product = require('../models/productmodel')

const Ordercontroller = require('../controllers/order')

router.get('/',Ordercontroller.orders_getAll)

router.post('/', (req, res,next)=>{
  Product.findById(req.body.productId).then(
    product => {
      if (!product) {
        res.status(404).json({
          message : 'Product not found'
        })
      }
      const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.productId,
        phoneNumber : req.body.phoneNumber
      })
    return order.save()
    }).then(
      result => {
        console.log(result)
        res.status(201).json({
          message: "Order Stored",
          orderCreated : {
            _id: result._id,
            product : result.product,
            quantity : result.quantity,
            phoneNumber : result.phoneNumber
          }
        })
      }
    ).catch(
      err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
      }
    )
 })
router.get('/:orderId',(req,res,next)=>{
    Order.findById(req.params.orderId).populate('product','name','price').exec().then(
      order =>{
        res.status(200).json({
          order: order
        })
      }
    ).catch(
      err => {
        res.status(500).json({
          error : err
        })
      }
    )
})

router.delete('/:orderId',(req,res,next)=>{
  Order.remove({_id : req.params.orderId}).exec().then(
    result => {
      if (!result) {
        return res.status(404).json({
          message : 'Order not found'
        })
      }
      res.status(200).json({
      message: "Order deleted",
      product: result}
  ).catch(
    error => {
      console.log(error)
      res.status(500).json({
        error : error
      })
    }
  )
})
})

module.exports = router;
