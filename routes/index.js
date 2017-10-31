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
    myCss: 'style.css',
    drinks: drinks,
    tagline: tagline
  });
});

router.get('/about', function (req, res, next) {
  res.render('pages/about', {
    title: 'About',
    myCss: 'style.css'
  });
});

router.get('/chart-1', function (req, res, next) {
  res.render('pages/charts/chart-1', {
    title: 'Chart 1',
    myCss: 'charts/chart-01'
  });
});

router.get('/chart-2', function (req, res, next) {
  res.render('pages/charts/chart-2', {
    title: 'Chart 2',
    myCss: 'charts/chart-02'
  });
});

router.get('/chart-3', function (req, res, next) {
  res.render('pages/charts/chart-3', {
    title: 'Chart 3',
    myCss: 'style.css'
  });
});

router.get('/json-server-orders', function (req, res, next) {
  res.render('pages/json-server-orders', {
    title: 'Orders',
    myCss: 'style.css'
  });
});

router.get('/rest-api-orders', function (req, res, next) {
  res.render('pages/rest-api-orders', {
    title: 'Orders Data from RESTful API',
    myCss: 'style.css'
  });
});

router.get('/form/entry', function (req, res, next) {
  res.render('pages/form/entry', {
    title: 'Entry Form',
    myCss: 'style.css'
  });
});

router.get('/form/customize-item', function (req, res, next) {
  res.render('pages/form/customize-item', {
    title: 'Customize Item',
    myCss: 'style.css'
  });
});

module.exports = router;
