//SERVER.JS

//requires
var fs = require('fs');
var http = require('http');
var people = require('monk')('localhost/people');
var students = people.get('students');


//Server
	var server = http.createServer(handleRequest);

	server.listen(8000, function(){
		console.log("Server is up and running!");
	});


//Handler
function handleRequest(req, res) {
  if(req.url !== undefined){

      res.setHeader("Content-Type", "text/html");

      // var returnArray = cleanURL(req.url);
      // console.log('RETURNED: ', returnArray = cleanURL(req.url));
      // console.log('Return Array: ', returnArray);
      // dataObj = returnArray[0];
      // path = returnArray[1];



      //BUILD PATH
      //BUILD DATAOBJ
    var path = req.url.split('?')[0];   
    var query = req.url.split('?')[1];
    if(query)
    {
        console.log('Path in cleanURL: ', path);
        console.log('Query in cleanURL: ', query);

        var queryArray = query.split('&');
        var dataObj = {};
        queryArray.forEach(function(element, index){
            var key = element.split('=')[0];
            var value = element.split('=')[1];

            dataObj[key] = value;
        });
    } else {
        res.write('No data for query');
    }





	//routes
    switch(path)
    {
        case '/': 
        	fetchFile(req, res, './index.html'); 
        	break;
        case '/index': 
        	fetchFile(req, res, './index.html'); 
        	break;
        case '/index.html': 
        	fetchFile(req, res, './index.html'); 
        	break;
        case '/app.js': 
        	fetchFile(req, res, './app.js'); 
        	break;
        case '/students':
        	
            students.find({}, function(err, data){
        		console.log("Within students");
        		if(err)
        		{
        			throw err;
        		}else{
                    var qData = JSON.stringify(data);
        			res.write(qData);
                    fetchFile(req, res, '/students.html');
        		}
        	});

        break;


        case '/students/create':
        	console.log('Within students/create');
            console.log('in create',  dataObj);
            if(dataObj)
            {
        	students.insert({dataObj}, function(err,data){
        		if (err) {
        			throw err;
        		} else {
                    fetchFile(req, res, './create.html');
        		}
        	});
            }else{       
                fetchFile(req, res, './create.html');
            }
        	break;


        case '/students/delete':
        	if(dataObj)
            {
                students.remove({dataObj}, function(err,data){
            
        		if (err) {
        			throw err;
        		} else {
        			fetchFile(req, res, './delete.html');
        		}
        	   });
            } else {
                fetchFile(req, res, './delete.html');
            }


        	break;
        case '/students/update':
        	if(dateObj && dateObj2)
            {
        	   students.update({dataObj}, {dataObj2},  function(err,data){
            		if (err) {
                        throw err;
                    } else {
                        fetchFile(req, res, './update.html');
                    }
                });
            } else {
                fetchFile(req, res, './update.html');
            }


        	break;
 	    default: fetchFile(req, res, './index.html'); break;

    }//End Switch
  } else {

     // respondError(req, res);

  }//End if
}//End Function


function fetchFile(req, res, filename){
	fs.readFile(filename, function(err, data){
		handleFileLoad(req, res, err, data);
	});
}

function handleFileLoad(req, res, err, data){
	if(err)
	{
		throw err;
	}else{

		res.write(data);
		res.end();
	}
};



// function cleanURL(url){
// 	var path = url.split('?')[0];
// 	var query = url.split('?')[1];

//     if(query)
//     {
// 	console.log('Path in cleanURL: ', path);
// 	console.log('Query in cleanURL: ', query);

// 	var queryArray = query.split('&');
// 	var newObject = {};
// 	queryArray.forEach(function(element, index){
//         var key = element.split('=')[0];
//         var value = element.split('=')[1];

//         newObject[key] = value;
// 	});
//     console.log('cleanURL -> handleRequest: ', newObject);

//     return [path, newObject];
//     }     
// }





























