var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../projectdb.db3');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var sprints = 'SELECT * FROM sprint ORDER BY start DESC'
	
	db.all(sprints, function(err, rows) {
	    if(err !== null) {
	        res.send(500, "An error has occurred -- " + err);
	    }
	    else if(rows == null) {
    	    res.send(500, "Database error");
	    }
	    else {
    	    //console.log(rows);
	        res.render('index', { title: 'JEST Sprints', sprints: rows }, function(err, html) {
	            res.status(200).send(html);
	        });
	    }
	});

});

/* GET sprint page. */
router.get('/sprint/:id', function(req, res, next) {
    
    var sprint = "SELECT p.name, s.end, s.devdays, t.est_points, t.points, (t.points - t.est_points) as diff FROM sprint_tasks t JOIN sprint s on t.sprint_id = s.id JOIN projects p on t.project_id = p.id WHERE s.id =" + req.params.id + " ORDER BY t.points DESC";
	
	db.all(sprint, function(err, rows) {
	    if(err !== null) {
	        res.send(500, "An error has occurred -- " + err);
	    }
	    else if(rows == null) {
    	    res.send(500, "Database error");
	    }
	    else {
    	    //console.log(rows);
	        res.render('sprint', { title: 'JEST Sprint', projects: rows }, function(err, html) {
	            res.status(200).send(html);
	        });
	    }
	});

});

module.exports = router;

