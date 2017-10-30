var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');


router.route('/users')
  .post(userController.postUsers)
 .get(userController.getUsers);


router.route('/student')
.post(userController.postStudent)
.get(userController.getStudent);


router.route('/university')
.post(userController.postUniversitydetails)



router.route('/showdetails/:name')
.get(userController.getAlldetails);


 router.route('/university/search/:reg')
  .get(userController.regexsearch);

  router.route('/search/:stream')
  .get(userController.promiseuse);


module.exports = router;