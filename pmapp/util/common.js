var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../projectdb.db3');

var getQr = function (q, callback) {
    db.all(q, function(err, rows) {
        if(err !== null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else if(rows == null) {
    	    res.send(500, "Database error");
        }
        else {
    	    console.log(rows);
            callback(rows);
        }
    });
}

module.exports = {
    getQr: getQr,
};