var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../projectdb.db3');

/* GET sprint page. */
router.get('/:id', function(req, res, next) {
    
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
	        res.render('sprint', { title: 'Geospatial Insights Sprint', projects: rows }, function(err, html) {
	            res.status(200).send(html);
	        });
	    }
	});

});

module.exports = router;

