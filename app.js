
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fetchcharts=require('./routes/mongoapi')
  ,	ejs = require("ejs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/dashboard',function(req,res){
	ejs.renderFile('./views/dashboard.ejs',{title:"hello"},function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('an error occurred');
			console.log(err);
		}
	});
});

app.get('/dashboard/rulesengine',function(req,res){
	ejs.renderFile('./views/Rulesengine.ejs',{title:"hello"},function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('an error occurred');
			console.log(err);
		}
	});
});

//app.get('/charts/dashboardtype/temperature',function(req,res){
//ejs.renderFile('./views/temperature.ejs',{title:"hello"},function(err,result){
//if(!err){
//	res.end(result);
//	}
//	
//	else{
//		res.end('an error occurred');
//		console.log(err);
//	}
//});
//});
//
//app.get('/charts/dashboardtype/humidity',function(req,res){
//	ejs.renderFile('./views/humidity.ejs',{title:"hello"},function(err,result){
//	if(!err){
//		res.end(result);
//		}
//		
//		else{
//			res.end('an error occurred');
//			console.log(err);
//		}	});
//	});

//api for fetching charts
app.get('/charts/:chartType',function(req,res){
var ct=req.params.chartType;
console.log("inside app.get method");
if(ct=="temp"){
fetchcharts.fetchTempChart(function(err,result){
	if(err){
		throw err;
}
else{
	console.log("result data_temp");
	console.log(result.data_temp);
	console.log("result data_temp_avg");
	console.log(result.data_temp_avg);
	console.log("datarange");
	console.log(result.data_temp_range);
ejs.renderFile('./views/temperature.ejs',{title:result.name,
	                                      datapoints:result.data_temp,
	                                      datapoints_avg:result.data_temp_avg,
	                                      datapoint_range:result.data_temp_range},
function(err, results) {
	// render on success
	if (!err) {
		res.end(results);
	}
	// render or error
	else {
		res.end('An error occurred');
		console.log(err);
	}
});
	//res.send(result.data);
	
 }
 },ct);
}else if(ct=="humidity"){
	fetchcharts.fetchHumidityCharts(function(err,result){
		if(err){
			throw err;
	}
	else{
		console.log("result data_humidity");
		console.log(result.data_humidity);
		console.log("result data_humidity_avg");
		console.log(result.data_humidity_avg);
		console.log("datarange");
		console.log(result.data_humidity_range);
	ejs.renderFile('./views/humidity.ejs',{title:result.name,
		                                   datapoints:result.data_humidity,
		                                   datapoints_avg:result.data_humidity_avg,
		                                   datapoint_range:result.data_humidity_range},
	function(err, results) {
		// render on success
		if (!err) {
			res.end(results);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
	//	res.send(result.data);
	 }
	 },ct);
}
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
