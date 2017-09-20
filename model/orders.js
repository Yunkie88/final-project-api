var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
order_id: Number,
login_id: String,
product_ids: [String],
status: String,
createdAt : {type: Date, default: Date.now}
});


module.exports = mongoose.model('Order', OrderSchema);