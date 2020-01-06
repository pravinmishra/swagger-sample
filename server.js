'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  swaggerUi = require('swagger-ui-express'),
  assetDocument = require('./asset.json'),
  configDocument = require('./config.json');

// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/swagger-demo');

// var UserSchema = new Schema({
//   email: {
//     type: String, required: true,
//     trim: true, unique: true,
//     match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
//   },
//   firstName: {type: String},
//   lastName: {type: String}
// });

// mongoose.model('User', UserSchema);
// var User = require('mongoose').model('User');

var app = express();

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//middleware for create
// var createUser = function (req, res, next) {
//   var user = new User(req.body);

//   user.save(function (err) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(user);
//     }
//   });
// };

// var updateUser = function (req, res, next) {
//   User.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(user);
//     }
//   });
// };

// var deleteUser = function (req, res, next) {
//   req.user.remove(function (err) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(req.user);
//     }
//   });
// };

// var getAllUsers = function (req, res, next) {
//   User.find(function (err, users) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(users);
//     }
//   });
// };

// var getOneUser = function (req, res) {
//   res.json(req.user);
// };

// var getByIdUser = function (req, res, next, id) {
//   User.findOne({_id: id}, function (err, user) {
//     if (err) {
//       next(err);
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// };

// router.route('/users')
//   .post(createUser)
//   .get(getAllUsers);

// router.route('/users/:userId')
//   .get(getOneUser)
//   .put(updateUser)
//   .delete(deleteUser);

// router.param('userId', getByIdUser);
app.get('/asset.json',function(req,res){
  res.json(assetDocument)
})
app.get('/config.json',function(req,res){
  res.json(configDocument)
})

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:7000/asset.json',
        name: 'Spec1'
      },
      {
        url: 'http://localhost:7000/config.json',
        name: 'Spec2'
      }
    ]
  }
}
app.use(express.static(__dirname))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

app.listen(7000);
module.exports = app;

