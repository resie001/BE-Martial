var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { user: 'req.user' });
});

module.exports = router;

// // create home route
// app.get('/', (req, res) => {
//   res.render('home', { user: req.user });
// });