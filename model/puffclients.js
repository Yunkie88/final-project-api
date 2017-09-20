var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
login_id: { type: String, unique: true },
password: String,
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


module.exports = mongoose.model('Client', ClientSchema);