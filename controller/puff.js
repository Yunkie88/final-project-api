var express = require('express');
var uniqueString = require('unique-string');
var router = express.Router();

router.get('/', function(req, res) {
res.json({ message: 'Hooray! Thank you for your business!' });
});

module.exports = router;

//Orders
var Order = require('../model/orders.js');
var history = router.route('/order/history');

var User = require('../model/puffclients.js');
var profile = router.route('/profile');
var userstatus = router.route ('/profile/userstatus');
var orderstatus = router.route ('/order/editStatus');
var order = router.route ('/order');
var product = router.route ('/products');
var Product = require ('../model/products.js');




history.get(function(req, res) {
Order.find({login_id:req.params.login_id}, function(err, order) {
if (err)
res.send(err);
res.json(order);
});
});

//Users

profile.post(function(req, res) {
var user = new User();
user.login_id = req.body.login_id;
user.password = req.body.password;
user.company_name = req.body.company_name;
user.brn_no = req.body.brn_no;
user.owner_name = req.body.owner_name;
user.owner_ic = req.body.owner_ic;
user.address = req.body.address;
user.ctc_no = req.body.ctc_no;
user.alt_ctc = req.body.alt_ctc;
user.email = req.body.email;
user.save(function(err) {
if (err)
res.send(err);
res.json({ message: 'User registered!' });
});
});

router.post('/profile/:id',function(req, res) {
User.findById({login_id:req.params.id}, function(err, user) {
if (err)
res.send(err);
user.password = req.body.password;
user.address = req.body.address;
user.ctc_no = req.body.ctc_no;
user.alt_ctc = req.body.alt_ctc;
user.email = req.body.email;
// save the user
user.save(function(err) {
if (err)
res.send(err);
res.json({ message: 'User updated!' });
});
});
});

profile.get(function(req, res) {
User.find(req.params.id, function(err, user) {
if (err)
res.send(err);
res.json(user);
});
});

router.get('/profile/:id',function(req, res) {
User.find({login_id:req.params.id}, function(err, user) {
if (err)
res.send(err);
res.json(user);
});
});




//order
order.post(function(req, res) {
Order.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, post) {
  console.log( post );
  var order = new Order();
	order.order_id = post.order_id +1;
	order.login_id = req.paramas.login_id;
	order.product_ids = req.params.product_ids; 
	order.save(function(err) {
		if (err)
		res.send(err);
		res.json({ message: 'Order Created!' });
});
});
});

order.get (function (req,res){
Order.find(function(err, orders) {
if (err)
res.send(err);
res.json(orders);
});
});


orderstatus.put(function(req, res) {
Order.findById(req.body.id, function(err, user) {
if (err)
res.send(err);
order.status = req.body.status;
// save the book
user.save(function(err) {
if (err)
res.send(err);
res.json({ message: 'Status updated!' });
});
});
});

//product
product.get (function (req,res){
Product.find(function(err, products) {
if (err)
res.send(err);
res.json(products);
});
});

product.post(function(req, res) {
var product = new Product();
product.product_id = req.body.product_id;
product.product_category = req.body.product_category;
product.product_picurl = req.body.product_picurl;
product.product_name = req.body.product_name;
product.product_description = req.body.product_description;
product.product_price = req.body.product_price;
product.product_status = req.body.product_status;
// save the product
product.save(function(err) {
if (err)
res.send(err);
res.json({ message: 'Product created!' });
});
});

router.get('/products/:id',function(req, res) {
Product.find(req.params.id, function(err, product) {
if (err)
res.send(err);
res.json(product);
});
});

router.post('/products/:id',function(req,res){
Product.findById(req.params.id,function(err,product){
if (err)
res.send(err);
product.product_id = req.body.product_id;
product.product_category = req.body.product_category;
product.product_picurl = req.body.product_picurl;
product.product_name = req.body.product_name;
product.product_description = req.body.product_description;
product.product_price = req.body.product_price;
product.product_status = req.body.product_status;
//save the product
product.save(function(err) {
if (err)
res.send(err);
res.json({ message: 'Product updated!' });
});
});
});


router.route ('/products/:id')
.delete(function(req, res) {
Product.remove({
_id: req.params.id
}, function(err, product) {
if (err)
res.send(err);
res.json({ message: 'Successfully deleted' });
});
});




router.route('/login')
.post(function(req,res){
        if(!req.body.username||
        !req.body.password){
        res.status(400);
        res.json({errors: "Bad request"});
    } else{
        User.findOne({username:req.body.username},function(err,user){
            if (err) throw err;
            user.verifyPassword(req.body.password,function(err,isMatch){
                if(err) throw err;
                console.log('Password',isMatch);
                if (isMatch){
                    res.json({message:"Successful login"})
                }

                else{
                	res.json ({message:"Login Failed"})
                }
            })
        })
    }
});

router.route ('/').get (authController.isAuthenticated, function(req,res){
    res.json({message:"Succesfully Authenticated"})
})