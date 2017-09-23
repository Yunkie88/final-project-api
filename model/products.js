var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
product_id: String,
product_picurl: String,
product_name: String,
product_description: String,
product_price: String,
product_status: String,
createdAt : {type: Date, default: Date.now},
});

var CategorySchema = new Schema ({
	category_id: Number,
	category_name: String,
	category_picurl:String,
	category_description:String,
	products: [ProductSchema],
	createdAt : {type: Date, default: Date.now}
})

module.exports = mongoose.model('Category', CategorySchema);
