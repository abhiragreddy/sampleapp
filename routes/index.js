var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req,res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/sampsite';
MongoClient.connect(url, function(err, db){
	if(err){
		console.log('unable to connect to the server',err);	
	}else {
		console.log("connection Established");
		var collection = db.collection('login');
		collection.find({}).toArray(function(err,result){
			if(err){
				res.send(err);
			} else if(result.length){
				res.render('loginlist', {
					"loginlist" : result
				});
			} else {
				res.send('No documents found');
			}
			db.close();
		});

	}
	});
});

router.get('/newlogin', function(req,res){
	res.render('newlogin', {title:'Add login'});

});

router.post('/addlogin', function(req,res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/sampsite'; 

	MongoClient.connect(url, function(err,db){
		if(err){
			console.log("unable to connect to server",err);	
		}else {
			console.log("connection Established");
			var collection = db.collection('login');
			var login1={Email: req.body.Email, Password: req.body.Password};
			collection.insert([login1], function(err,result){
				if(err){
					console.log(err);
				} else{
					res.redirect("thelist");
				}
				db.close();
			});
		}
	});
});

module.exports = router;
