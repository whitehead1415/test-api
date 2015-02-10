
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String
});

UserSchema.method('toJson', function(baseUrl) {
  var obj = this.toObject();
  obj.id = obj._id;
  obj.href = baseUrl + "/api/users/" + obj.id
  delete obj._id;
  delete obj.__v;
  return obj;
});

module.exports = mongoose.model('User', UserSchema);
