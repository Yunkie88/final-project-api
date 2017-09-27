var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
login_id: { type: String,
        lowercase: true,
        unique: true,
        required: true},
password: {type: String,
        required: true},
role: {
        type: String,
        enum: ['admin', 'distributor'],
        default: 'distributor'
    },
company_name: { type: String, unique: true },
brn_no: { type: String, unique: true },
owner_name: String,
owner_ic: String,
address: String,
email: String,
ctc_no: String,
alt_ctc: String,
createdAt : {type: Date, default: Date.now}
});


// ClientSchema.pre('save', function(next){
 
//     var user = this;
//     var SALT_FACTOR = 5;
 
//     if(!user.isModified('password')){
//         return next();
//     } 
 
//     bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
//         if(err){
//             return next(err);
//         }
 
//         bcrypt.hash(user.password, salt, null, function(err, hash){
 
//             if(err){
//                 return next(err);
//             }
 
//             user.password = hash;
//             next();
 
//         });
 
//     });
 
// });
 
// ClientSchema.methods.comparePassword = function(passwordAttempt, cb){
 
//     bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
//         if(err){
//             return cb(err);
//         } else {
//             cb(null, isMatch);
//         }
//     });
 
// }

module.exports = mongoose.model('Client', ClientSchema);