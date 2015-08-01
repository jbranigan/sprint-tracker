var express = require('express');
var router = express.Router();
var commonUtil  = require('../util/common');

/* GET home page. */
router.get('/', function(req, res, next) {
    var q = 'SELECT * FROM sprint ORDER BY start DESC';
    commonUtil.getQr(q, function(rows) {
        console.log('getting sprints list');
        res.render('index', { 
            title: 'Geospatial Insights Team Sprints', 
            sprints: rows 
        }, function(err, html) {
            res.status(200).send(html);
        }); 
    });  
});


module.exports = router;
