const Order = require('../models/orderModel')
const mongoose = require('mongoose')
exports.orders_getAll =  (req, res, next)=>{
  // Order.find({}, (err, result)=> {
  //   if(err)
  //     return err;
  //   res.status(200).send(result);
  // })
    Order.find().select('product quantity phoneNumber _id').populate('product','name').exec().then(
      docs => {
        res.status(200).json({
          count: docs.length,
          orders : docs.map( doc=>{
            return {
              _id: doc._id,
              product:doc.product,
              quantity: doc.quantity,
              phoneNumber: doc.phoneNumber
            }
          })
        })
      }
    ).catch(
      err =>{
        res.status(500).json({
          error:err
        })
      }
    )
}
