var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
product_id: Number,
product_category: String,
product_picurl: String,
product_name: String,
product_description: String,
product_price: String,
product_status: String,
createdAt : {type: Date, default: Date.now}
});


module.exports = mongoose.model('Product', ProductSchema);