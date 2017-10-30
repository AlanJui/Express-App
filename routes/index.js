var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var drinks = [
    { name: 'Bloody Mary', drunkness: 3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
  ];
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('pages/index', {
    title: 'Home Page',
    drinks: drinks,
    tagline: tagline
  });
});

router.get('/about', function (req, res, next) {
  res.render('pages/about', {
    title: 'About'
  });
});

router.get('/orders', function (req, res, next) {
  res.render('pages/orders', {
    title: 'Orders'
  });
});

router.get('/chart-1', function (req, res, next) {
  res.render('pages/charts/chart-1', {
    title: 'Chart 1'
  });
});

router.get('/chart-2', function (req, res, next) {
  res.render('pages/charts/chart-2', {
    title: 'Chart 2'
  });
});

router.get('/chart-3', function (req, res, next) {
  res.render('pages/charts/chart-3', {
    title: 'Chart 3'
  });
});

router.get('/json-server-orders', function (req, res, next) {
  res.render('pages/json-server-orders', {
    title: 'Orders'
  });
});

router.get('/rest-api-orders', function (req, res, next) {
  res.render('pages/rest-api-orders', {
    title: 'Orders Data from RESTful API'
  });
});

router.get('/form/entry', function (req, res, next) {
  res.render('pages/form/entry', {
    title: 'Entry Form'
  });
});

router.get('/form/customize-item', function (req, res, next) {
  res.render('pages/form/customize-item', {
    title: 'Customize Item'
  });
});

module.exports = router;
