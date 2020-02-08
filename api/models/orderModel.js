const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  quantity : {type: String, default: "1"},
  phoneNumber: {type:String, required : true}
})

module.exports = mongoose.model('Order', orderSchema)
