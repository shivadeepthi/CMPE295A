var mongodb = require('mongodb');
url='mongodb://cmpe295:cmpe295@ds031982.mongolab.com:31982/cmpe295';
var db;

function fetchTempChart (callback,chartname){
console.log("i am here mongo");
db = new mongodb.Db('cmpe295', new mongodb.Server('ds031982.mongolab.com', 31982, {auto_reconnect:true}), {});
db.open(function(err, p_client) {
	db.authenticate('cmpe295', 'cmpe295', function(err) {
		if (err) 
			throw err;
		   else
			   {
			 var collec=db.collection('attributes');
			  collec.findOne({"name": chartname}, function (err, recs) {
			   if(err){
				   throw err;
			   }else{
				   if(recs.length!=0){
					   console.log("insde find method");
					  console.log(recs);
					   callback(err,recs); 
				   }else{
					   callback(err,null);
				   }
			   }
			   });
			   }
			   });
	});
}

function fetchHumidityCharts (callback,chartname){
	console.log("i am here mongo");
	db = new mongodb.Db('cmpe295', new mongodb.Server('ds031982.mongolab.com', 31982, {auto_reconnect:true}), {});
	db.open(function(err, p_client) {
		db.authenticate('cmpe295', 'cmpe295', function(err) {
			if (err) 
				throw err;
			   else
				   {
				   var collec=db.collection('attributes');
				  collec.findOne({"name": chartname}, function (err, recs) {
				   if(err){
					   throw err;
				   }else{
					   if(recs.length!=0){
						   console.log("insde find method");
						  console.log(recs);
						   callback(err,recs);
						   
					   }else{
						   callback(err,null);
					   }
				   }
				   });
				   }
				   });
		});
	}

exports.fetchTempChart = fetchTempChart;
exports.fetchHumidityCharts = fetchHumidityCharts;