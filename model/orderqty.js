var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderQtySchema = new Schema({
qty_id: String,
product_ids: [String],
qty: Number,
createdAt : {type: Date, default: Date.now}
});


module.exports = mongoose.model('OrderQty', OrderQtySchema);